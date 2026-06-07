import React, { useState, useEffect } from 'react';
import { PackagePlus, X, Edit3, Image as ImageIcon, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import CKEditorField from '../../components/FormFields/CKEditor/CkEditorField';
import ApiUpload from '../../apis/ApiUpload';
import { loadImage } from '../../utils/constants';
import ProductImageModal from './ProductImageModal';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // Ví dụ: 2MB

export default function FormProduct({ initialData, onClose, onSubmit }) {
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);

    const { control, handleSubmit, setValue, getValues } = useForm({
        defaultValues: {
            maSP: '',
            name: '',
            price: 0,
            description: '',
            detail: '',
            status: true,
            isTopSeller: false,
        },
    });

    // ====================================== INIT ================================
    useEffect(() => {
        const loadInitialImage = async (imagePath) => {
            try {
                setIsLoading(true);
                const previewUrl = await loadImage(imagePath)

                setImagePreview(previewUrl);
            } catch (error) {
                console.error('Failed to load initial image:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (initialData) {
            setValue('maSP', initialData.maSP || '');
            setValue('name', initialData.name || '');
            setValue('price', initialData.price || 0);
            setValue('description', initialData.description || '');
            setValue('detail', initialData.detail || '');
            setValue('status', initialData.status ?? true);
            setValue('isTopSeller', initialData.isTopSeller ?? true);
            setImageFile(null); // Keep file as null for existing products
            setImagePreview(initialData.image || ''); // Show existing image as preview

            // Nếu sản phẩm đã có ảnh, gọi API để lấy nội dung ảnh hiển thị
            if (initialData.image) {
                loadInitialImage(initialData.image);
            }
        }
    }, [initialData, setValue]);

    // =========================================== CRUD ================================================
    // Hàm xử lý upload ảnh từ logic bạn cung cấp
    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > MAX_FILE_SIZE) {
            toast.error(`Kích thước tệp phải nhỏ hơn ${MAX_FILE_SIZE / 1024}KB.`);
            e.target.value = null;
            return;
        }

        if (!file.type.startsWith('image/')) {
            toast.error('Vui lòng chọn một tệp hình ảnh hợp lệ.');
            e.target.value = null;
            return;
        }

        setIsLoading(true);
        try {
            // Upload file và lấy path từ backend
            const uploadData = new FormData();
            uploadData.append('myFiles', file);
            const uploadRes = await ApiUpload.UploadFileApi(uploadData);

            if (uploadRes && uploadRes.DT) {
                const filePath = uploadRes.DT; // Lấy path từ response

                // Đọc ảnh từ path đó
                const imageRes = await ApiUpload.GetFileApi(filePath);

                // Chuyển arraybuffer thành blob URL để preview
                const blob = new Blob([imageRes], { type: 'image/jpeg' });
                const previewUrl = URL.createObjectURL(blob);

                setImageFile(filePath); // Lưu path từ backend
                setImagePreview(previewUrl);
                toast.success('Tải tệp lên thành công!');
            } else {
                toast.error('Không thể lấy path file từ server!');
            }
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Tải tệp lên thất bại!');
        } finally {
            setIsLoading(false);
            e.target.value = null; // Reset input
        }
    };

    const handleLocalSubmit = handleSubmit((data) => {
        // Gửi image path (string), không gửi file object
        onSubmit({
            ...data,
            price: Number(data.price),
            maSP: data.maSP,
            name: data.name,
            image: imageFile // Gửi path string từ server hoặc existing path
        });
    });

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className={`${initialData ? 'bg-blue-600' : 'bg-teal-600'} p-4 flex justify-between items-center text-white`}>
                    <h3 className="font-bold flex items-center gap-2">
                        {initialData ? <Edit3 size={20} /> : <PackagePlus size={20} />}
                        {initialData ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
                    </h3>
                    <button onClick={onClose} className="hover:bg-black/20 rounded-full p-1 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form className="p-6 space-y-4 max-h-[80vh] overflow-y-auto" onSubmit={handleLocalSubmit}>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Mã sản phẩm</label>
                        <Controller
                            name="maSP"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    required
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                                    placeholder="Ví dụ: PROD001..."
                                />
                            )}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Tên sản phẩm</label>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    required
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                                    placeholder="Ví dụ: iPhone 15 Pro Max..."
                                />
                            )}
                        />
                    </div>

                    {/* Phần Hình Ảnh */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Hình ảnh sản phẩm</label>
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
                                    disabled={isLoading}
                                />
                                <div className="flex items-center gap-6">
                                    {/* Nút chọn / thay đổi */}
                                    <label
                                        htmlFor="file-upload"
                                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                                    >
                                        {isLoading && <Loader2 className="animate-spin mr-2" size={16} />}
                                        {imagePreview ? 'Thay đổi ảnh' : 'Chọn ảnh'}
                                    </label>

                                    {/* Nút thêm ảnh */}
                                    <button
                                        type="button"
                                        onClick={() => setShowImageModal(true)}
                                        className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-md text-xs font-semibold hover:bg-teal-700"
                                    >
                                        <ImageIcon size={16} className="mr-1" />
                                        Thêm ảnh
                                    </button>
                                </div>
                                <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF tối đa 5MB.</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Giá bán (VNĐ)</label>
                            <Controller
                                name="price"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        required
                                        type="number"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Trạng thái</label>
                            <label className="relative inline-flex items-center cursor-pointer mt-2">
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            type="checkbox"
                                            checked={field.value}
                                            onChange={field.onChange}
                                            className="sr-only peer"
                                        />
                                    )}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                                <span className="ml-3 text-sm font-medium text-gray-700">
                                    <Controller
                                        name="status"
                                        control={control}
                                        render={({ field }) => field.value ? 'Đang bán' : 'Ngừng bán'}
                                    />
                                </span>
                            </label>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Top Seller</label>
                            <label className="relative inline-flex items-center cursor-pointer mt-2">
                                <Controller
                                    name="isTopSeller"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            type="checkbox"
                                            checked={field.value}
                                            onChange={field.onChange}
                                            className="sr-only peer"
                                        />
                                    )}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                                <span className="ml-3 text-sm font-medium text-gray-700">
                                    <Controller
                                        name="isTopSeller"
                                        control={control}
                                        render={({ field }) => field.value ? 'Top Seller' : 'Bình thường'}
                                    />
                                </span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Mô tả ngắn</label>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <textarea
                                    {...field}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                                    rows="2"
                                />
                            )}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Mô tả chi tiết
                        </label>
                        <CKEditorField
                            name="detail"
                            control={control}
                            label=""
                        />
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                            Hủy bỏ
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`flex-1 px-4 py-2.5 text-white font-semibold rounded-lg shadow-md transition-colors ${isLoading ? 'opacity-50' : ''} ${initialData ? 'bg-blue-600 hover:bg-blue-700' : 'bg-teal-600 hover:bg-teal-700'}`}
                        >
                            {initialData ? 'Cập nhật' : 'Lưu sản phẩm'}
                        </button>
                    </div>
                </form>
            </div>

            {showImageModal && (
                <ProductImageModal
                    productId={initialData?.id}
                    onClose={() => setShowImageModal(false)}
                />
            )}
        </div>
    );
}