import React, { useState, useEffect } from 'react';
import { PackagePlus, X, Edit3, Image as ImageIcon, Loader2, Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import ApiProduct from '../../apis/ApiProduct';
import ApiProductImage from '../../apis/ApiProductImage';
import ApiUpload from '../../apis/ApiUpload';
import { loadImage } from '../../utils/constants';
import ProductImageModal from './ProductImageModal';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function ProductImageManager() {
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState('');
    const [productImages, setProductImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowForm, setIsShowForm] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const { control, handleSubmit, setValue, reset } = useForm({
        defaultValues: {
            productId: '',
            image: '',
            color: ''
        },
    });

    // Fetch danh sách sản phẩm cho dropdown
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await ApiProduct.getListProductDropdownApi();
                if (res && res.EC === 0) {
                    setProducts(res.DT);
                } else {
                    toast.error("Không thể tải danh sách sản phẩm");
                }
            } catch (error) {
                toast.error("Lỗi khi tải danh sách sản phẩm");
            }
        };
        fetchProducts();
    }, []);

    // Fetch hình ảnh khi chọn sản phẩm
    useEffect(() => {
        if (selectedProductId) {
            fetchProductImages(selectedProductId);
        } else {
            setProductImages([]);
        }
    }, [selectedProductId]);

    const fetchProductImages = async (productId) => {
        setIsLoading(true);
        try {
            const res = await ApiProductImage.getProductImagesByProductIdApi(productId);
            if (res && res.EC === 0) {
                setProductImages(res.DT);
            } else {
                toast.error("Không thể tải hình ảnh sản phẩm");
            }
        } catch (error) {
            toast.error("Lỗi khi tải hình ảnh sản phẩm");
        } finally {
            setIsLoading(false);
        }
    };

    const handleProductChange = (e) => {
        setSelectedProductId(e.target.value);
    };

    const handleAddNew = () => {
        setSelectedImage(null);
        reset({
            productId: selectedProductId,
            image: '',
            color: ''
        });
        setImagePreview('');
        setImageFile(null);
        setIsShowForm(true);
    };

    const handleEdit = (image) => {
        setSelectedImage(image);
        reset({
            productId: image.productId,
            image: image.image,
            color: image.color
        });
        setImagePreview(image.image);
        setImageFile(image.image);
        setIsShowForm(true);
    };

    const handleDelete = async (image) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa hình ảnh này không?`)) {
            try {
                const res = await ApiProductImage.deleteProductImageApi(image.id);
                if (res && res.EC === 0) {
                    toast.success("Xóa hình ảnh thành công!");
                    fetchProductImages(selectedProductId);
                } else {
                    toast.error(res.EM);
                }
            } catch (error) {
                toast.error("Lỗi khi xóa hình ảnh");
            }
        }
    };

    // Upload file
    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > MAX_FILE_SIZE) {
            toast.error(`Kích thước tệp phải nhỏ hơn ${MAX_FILE_SIZE / 1024 / 1024}MB.`);
            e.target.value = null;
            return;
        }

        if (!file.type.startsWith('image/')) {
            toast.error('Vui lòng chọn một tệp hình ảnh hợp lệ.');
            e.target.value = null;
            return;
        }

        setUploading(true);
        try {
            const uploadData = new FormData();
            uploadData.append('myFiles', file);
            const uploadRes = await ApiUpload.UploadFileApi(uploadData);

            if (uploadRes && uploadRes.DT) {
                const filePath = uploadRes.DT;
                const imageRes = await ApiUpload.GetFileApi(filePath);
                const blob = new Blob([imageRes], { type: 'image/jpeg' });
                const previewUrl = URL.createObjectURL(blob);

                setImageFile(filePath);
                setImagePreview(previewUrl);
                setValue('image', filePath);
                toast.success('Tải tệp lên thành công!');
            } else {
                toast.error('Không thể lấy path file từ server!');
            }
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Tải tệp lên thất bại!');
        } finally {
            setUploading(false);
            e.target.value = null;
        }
    };

    const handleSubmitForm = handleSubmit(async (data) => {
        try {
            let res;
            if (selectedImage) {
                res = await ApiProductImage.updateProductImageApi(selectedImage.id, {
                    ...data,
                    image: imageFile
                });
                if (res && res.EC === 0) {
                    toast.success("Cập nhật hình ảnh thành công!");
                } else {
                    toast.error(res.EM);
                }
            } else {
                res = await ApiProductImage.createProductImageApi({
                    ...data,
                    image: imageFile
                });
                if (res && res.EC === 0) {
                    toast.success("Thêm hình ảnh thành công!");
                } else {
                    toast.error(res.EM);
                }
            }
            setIsShowForm(false);
            fetchProductImages(selectedProductId);
        } catch (error) {
            toast.error("Lỗi khi lưu hình ảnh");
        }
    });

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Quản lý hình ảnh sản phẩm</h1>
            </div>

            {/* Dropdown chọn sản phẩm */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chọn sản phẩm
                </label>
                <select
                    value={selectedProductId}
                    onChange={handleProductChange}
                    className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">-- Chọn sản phẩm --</option>
                    {products.map(product => (
                        <option key={product.id} value={product.id}>
                            {product.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Danh sách hình ảnh */}
            {selectedProductId && (
                <div className="bg-white rounded-lg shadow">
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Hình ảnh sản phẩm ({productImages.length})
                        </h2>
                        <button
                            onClick={handleAddNew}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            <Plus size={16} />
                            Thêm hình ảnh
                        </button>
                    </div>

                    {isLoading ? (
                        <div className="p-8 text-center">
                            <Loader2 className="animate-spin mx-auto mb-2" size={24} />
                            <p className="text-gray-500">Đang tải...</p>
                        </div>
                    ) : productImages.length === 0 ? (
                        <div className="p-8 text-center">
                            <ImageIcon className="mx-auto mb-2 text-gray-400" size={24} />
                            <p className="text-gray-500">Chưa có hình ảnh nào cho sản phẩm này</p>
                        </div>
                    ) : (
                        <div className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {productImages.map(image => (
                                    <div key={image.id} className="border border-gray-200 rounded-lg p-4">
                                        <div className="aspect-w-1 aspect-h-1 mb-3">
                                            <img
                                                src={image.image}
                                                alt={`Hình ảnh ${image.color}`}
                                                className="w-full h-32 object-cover rounded-md"
                                                onError={(e) => {
                                                    e.target.src = '/placeholder-image.png';
                                                }}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium">Màu sắc:</span> {image.color}
                                            </p>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(image)}
                                                    className="flex-1 flex items-center justify-center gap-1 px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 transition-colors"
                                                >
                                                    <Edit3 size={14} />
                                                    Sửa
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(image)}
                                                    className="flex-1 flex items-center justify-center gap-1 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                                                >
                                                    <Trash2 size={14} />
                                                    Xóa
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Modal Form */}
            {isShowForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

                        {/* Header */}
                        <div className={`${selectedImage ? 'bg-blue-600' : 'bg-teal-600'} p-4 flex justify-between items-center text-white`}>
                            <h3 className="font-bold flex items-center gap-2">
                                {selectedImage ? <Edit3 size={20} /> : <PackagePlus size={20} />}
                                {selectedImage ? 'Chỉnh sửa hình ảnh' : 'Thêm hình ảnh mới'}
                            </h3>
                            <button onClick={() => setIsShowForm(false)} className="hover:bg-black/20 rounded-full p-1 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form className="p-6 space-y-4 max-h-[80vh] overflow-y-auto" onSubmit={handleSubmitForm}>
                            {/* Phần Hình Ảnh */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Hình ảnh</label>
                                <div className="flex items-center gap-4">
                                    <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50">
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon className="text-gray-400" size={32} />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            id="file-upload"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            disabled={uploading}
                                        />
                                        <div className="flex items-center gap-6">
                                            <label
                                                htmlFor="file-upload"
                                                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                                            >
                                                {uploading && <Loader2 className="animate-spin mr-2" size={16} />}
                                                {imagePreview ? 'Thay đổi ảnh' : 'Chọn ảnh'}
                                            </label>

                                            <button
                                                type="button"
                                                onClick={() => setShowImageModal(true)}
                                                className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-md text-xs font-semibold hover:bg-teal-700"
                                            >
                                                <ImageIcon size={16} className="mr-1" />
                                                Chọn từ thư viện
                                            </button>
                                        </div>
                                        <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF tối đa 5MB.</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Màu sắc</label>
                                <Controller
                                    name="color"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            required
                                            type="text"
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                                            placeholder="Ví dụ: Đỏ, Xanh navy..."
                                        />
                                    )}
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsShowForm(false)}
                                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Hủy bỏ
                                </button>
                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className={`flex-1 px-4 py-2.5 text-white font-semibold rounded-lg shadow-md transition-colors ${uploading ? 'opacity-50' : ''} ${selectedImage ? 'bg-blue-600 hover:bg-blue-700' : 'bg-teal-600 hover:bg-teal-700'}`}
                                >
                                    {selectedImage ? 'Cập nhật' : 'Lưu hình ảnh'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {showImageModal && (
                        <ProductImageModal
                            productId={selectedProductId}
                            onClose={() => setShowImageModal(false)}
                            onSelect={async (img) => {
                                try {
                                    const imageRes = await ApiUpload.GetFileApi(img.image);
                                    const blob = new Blob([imageRes], { type: 'image/jpeg' });
                                    const previewUrl = URL.createObjectURL(blob);
                                    setImagePreview(previewUrl);
                                    setImageFile(img.image);
                                    setValue('image', img.image);
                                } catch (error) {
                                    toast.error('Không thể tải ảnh');
                                }
                                setShowImageModal(false);
                            }}
                        />
                    )}
                </div>
            )}
        </div>
    );
}