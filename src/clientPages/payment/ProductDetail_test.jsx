import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ApiProduct from '../../apis/ApiProduct';
import { toast } from 'react-toastify';
import ImageLoader from '../../components/FormFields/ImageLoader';
import ApiProductImage from "../../apis/ApiProductImage";
import { loadImage } from '../../utils/constants';

const ProductDetail = () => {
    const id_product = 134;
    const userInfo = useSelector(state => state.auth?.userInfo);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [product, setProduct] = useState({});
    const [productImages, setProductImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoadingImages, setIsLoadingImages] = useState(false);

    // --- STATE CHO POPUP ---
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    useEffect(() => {
        let fetchDetail = async () => {
            let res = await ApiProduct.getProductByIdApi(id_product);

            if (res && res.DT) {
                setProduct(res.DT);
                setSelectedImage(res.DT.image || null);
                setIsLoadingImages(true);
                try {
                    let imageRes = await ApiProductImage.getProductImagesByProductIdApi(id_product);
                    if (imageRes && imageRes.DT) {
                        const imagesWithPreview = await Promise.all(
                            imageRes.DT.map(async (img) => {
                                try {
                                    const previewUrl = await loadImage(img.image);
                                    return { ...img, previewUrl };
                                } catch (error) {
                                    return { ...img, previewUrl: img.image };
                                }
                            })
                        );
                        setProductImages(imagesWithPreview);
                    }
                } catch (error) {
                    console.error('Error loading images:', error);
                } finally {
                    setIsLoadingImages(false);
                }
            }
        };
        if (id_product) fetchDetail();
    }, [id_product, dispatch]);

    // Hàm mở Modal hoặc yêu cầu đăng nhập
    const handleBuyNow = () => {
        if (!userInfo?.id) {
            toast.error('Vui lòng đăng nhập trước khi thanh toán');
            return;
        }
        setShowPaymentModal(true);
    };

    // Hàm chuyển hướng thực sự
    const goToPayment = (type) => {
        const cleanProduct = {
            id: String(product.id || product.productId || id_product || ""),
            name: String(product.name || ""),
            price: Number(product.price) || 0,
            image: typeof product.image === 'string' ? product.image : "",
            description: String(product.description || ""),
        };

        const path = type === 'momo' ? '/payment-momo' : '/payment-vietqr';
        navigate(path, { state: { product: cleanProduct } });
        setShowPaymentModal(false);
    };

    if (!product || Object.keys(product).length === 0) {
        return <div className="text-center py-20">Đang tải...</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* --- GIAO DIỆN CHÍNH --- */}
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 py-10 lg:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Gallery Hình ảnh */}
                        <div className="space-y-4">
                            <div className="relative bg-[#f8f8f8] rounded-3xl p-2 flex justify-center items-center overflow-hidden group">
                                <ImageLoader
                                    imagePath={selectedImage || product.image || null}
                                    className="w-auto h-[400px] object-contain transform group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            {/* Thumbnails... */}
                        </div>

                        {/* Thông tin */}
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tighter">
                                {product.name}
                            </h1>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">{product.description}</p>

                            <div className="flex flex-col gap-6 mb-10">
                                <div className="flex flex-col">
                                    <span className="text-3xl font-black text-red-600">
                                        {(Number(product.price || 0)).toLocaleString('vi-VN')} VNĐ
                                    </span>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={handleBuyNow}
                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform transition active:scale-95 uppercase tracking-wider"
                                    >
                                        Mua ngay - Thanh toán
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- MÔ TẢ CHI TIẾT --- */}
            <section className="max-w-7xl mx-auto px-4 mt-10">
                <div className="bg-white p-8 rounded-3xl shadow-sm" dangerouslySetInnerHTML={{ __html: product.detail }} />
            </section>

            {/* --- MODAL CHỌN THANH TOÁN (POPUP) --- */}
            {showPaymentModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl transform transition-all animate-fade-in-up">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-black uppercase tracking-tight text-gray-900">Chọn phương thức</h3>
                            <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-gray-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            {/* Nút MoMo */}
                            <button
                                onClick={() => goToPayment('momo')}
                                className="w-full flex items-center justify-between p-4 border-2 border-gray-100 rounded-2xl hover:border-pink-500 hover:bg-pink-50 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center font-bold text-pink-600">M</div>
                                    <div className="text-left">
                                        <div className="font-bold text-gray-900">Ví MoMo</div>
                                        <div className="text-xs text-gray-500">Thanh toán qua ứng dụng MoMo</div>
                                    </div>
                                </div>
                                <div className="text-pink-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </div>
                            </button>

                            {/* Nút VietQR */}
                            <button
                                onClick={() => goToPayment('vietqr')}
                                className="w-full flex items-center justify-between p-4 border-2 border-gray-100 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center font-bold text-blue-600">QR</div>
                                    <div className="text-left">
                                        <div className="font-bold text-gray-900">VietQR / Ngân hàng</div>
                                        <div className="text-xs text-gray-500">Quét mã QR từ mọi ngân hàng</div>
                                    </div>
                                </div>
                                <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;