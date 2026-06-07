import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Loader2, Save, Trash2, RotateCcw } from 'lucide-react';
import CKEditorField from '../../components/FormFields/CKEditor/CkEditorField';
import UploadField from '../../components/FormFields/UploadField';
import ApiRecruitment from '../../apis/ApiRecruitment'
import { toast } from 'react-toastify'
import { useSearchParams, useNavigate } from 'react-router-dom';

const tailwindInputClasses =
    "w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm";

export default function RecruitmentDetail() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const idUpdate = searchParams.get('id');

    // 1. Xác định chế độ chỉnh sửa dựa trên ID
    const isEditMode = !!idUpdate;
    const [id] = useState(idUpdate);

    const { control, handleSubmit, reset, setValue, getValues } = useForm({
        defaultValues: {
            title: '',
            type: '',
            experience: '',
            status: true,
            description: '',
            detail: '',
            image: '',
            id: id || null,
        },
    });

    const [isLoading, setIsLoading] = useState(false);

    // ============================================= INIT ========================================
    // 2. Tải dữ liệu cũ nếu là chế độ chỉnh sửa
    useEffect(() => {
        if (isEditMode && id) {
            fetchDetail(id);
        }
    }, [id, isEditMode]);

    const fetchDetail = async (id) => {
        setIsLoading(true);
        try {
            const res = await ApiRecruitment.getRecruitmentByIdApi(id);
            if (res && res.DT) {
                const data = res.DT;
                setValue('title', data.title || '');
                setValue('type', data.type || '');
                setValue('experience', data.experience || '');
                setValue('status', data.status);
                setValue('description', data.description || '');
                setValue('detail', data.detail || '');
                setValue('image', data.image || '');
                setValue('id', data.id);
            } else {
                toast.error("Không tìm thấy thông báo hoặc lỗi tải dữ liệu.");
            }
        } catch (error) {
            toast.error("Lỗi khi tải chi tiết thông báo.");
        } finally {
            setIsLoading(false);
        }
    };

    // ============================================= CRUD ================================================
    // 3. Xử lý Form: Thêm mới hoặc Cập nhật
    const handleFormSubmit = handleSubmit(async (formValues) => {
        setIsLoading(true);
        try {
            // Kiểm tra validate cơ bản
            if (!formValues.title.trim()) {
                toast.error('Vui lòng nhập tiêu đề');
                setIsLoading(false);
                return;
            }
            if (!formValues.description.trim()) {
                toast.error('Vui lòng nhập mô tả ngắn');
                setIsLoading(false);
                return;
            }
            if (!formValues.type) {
                toast.error('Vui lòng chọn loại công việc');
                setIsLoading(false);
                return;
            }
            if (!formValues.experience) {
                toast.error('Vui lòng chọn kinh nghiệm');
                setIsLoading(false);
                return;
            }

            const content = formValues.detail.replace(/<[^>]*>/g, '').trim();
            if (!content) {
                toast.error('Vui lòng nhập nội dung');
                setIsLoading(false);
                return;
            }

            const apiPayload = {
                ...formValues,
                ...(isEditMode && { id: id }),
            };

            let res;
            if (isEditMode) {
                // HÀM CẬP NHẬT
                res = await ApiRecruitment.updateRecruitmentApi(id, apiPayload);

                if (res && res.EC === 0) {
                    toast.success(`Cập nhật thông báo thành công!`);
                    navigate('/recruitment/manager')
                    reset();
                } else {
                    toast.error(res.EM);
                }
            } else {
                // HÀM THÊM MỚI
                res = await ApiRecruitment.createRecruitmentApi(apiPayload);

                if (res && res.EC === 0) {
                    toast.success(`Thêm mới thông báo thành công!`);
                    navigate('/recruitment/manager')
                    reset();
                } else {
                    toast.error(res.EM);
                }
            }

        } catch (error) {
            toast.error(`Lỗi hệ thống khi ${isEditMode ? 'cập nhật' : 'tạo'} thông báo`);
        } finally {
            setIsLoading(false);
        }
    });

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-full mx-auto">
                {/* Header */}
                <h1 className="text-xl md:text-2xl text-gray-600">
                    {isEditMode ? 'Chỉnh sửa bài viết' : 'Thêm bài mới'}
                </h1>

                {/* Main Content */}
                <div className="max-w-0xl mx-auto px-4 py-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-6 space-y-6">

                            {/* 1. Tiêu đề */}
                            <div className="grid grid-cols-12 gap-6 items-start">
                                <label className="col-span-12 md:col-span-2 text-sm font-medium text-gray-700 md:pt-2.5">
                                    Tiêu đề <span className="text-red-500">*</span>
                                </label>
                                <div className="col-span-12 md:col-span-10">
                                    <Controller
                                        name="title"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type="text"
                                                className={tailwindInputClasses}
                                                placeholder="Nhập tiêu đề thông báo"
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            {/* 1.1 Type & Experience */}
                            <div className="grid grid-cols-12 gap-6 items-start">
                                <label className="col-span-12 md:col-span-2 text-sm font-medium text-gray-700 md:pt-2.5">
                                    Phân loại
                                </label>

                                <div className="col-span-12 md:col-span-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Type */}
                                    <Controller
                                        name="type"
                                        control={control}
                                        render={({ field }) => (
                                            <select {...field} className={tailwindInputClasses}>
                                                <option value="">-- Chọn loại --</option>
                                                <option value="intern">Intern</option>
                                                <option value="fulltime">Full-time</option>
                                                <option value="freelance">Freelance</option>
                                            </select>
                                        )}
                                    />

                                    {/* Experience */}
                                    <Controller
                                        name="experience"
                                        control={control}
                                        render={({ field }) => (
                                            <select {...field} className={tailwindInputClasses}>
                                                <option value="">-- Kinh nghiệm --</option>
                                                <option value="0-1">0 – 1 năm</option>
                                                <option value="1-3">1 – 3 năm</option>
                                                <option value="3-5">3 – 5 năm</option>
                                                <option value="5+">Trên 5 năm</option>
                                            </select>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* 2. Trạng thái - Checkbox */}
                            <div className="grid grid-cols-12 gap-6 items-start">
                                <label className="col-span-12 md:col-span-2 text-sm font-medium text-gray-700 md:pt-2">
                                    Trạng thái
                                </label>
                                <div className="col-span-12 md:col-span-10">
                                    <div className="flex items-center h-full pt-1">
                                        <Controller
                                            name="status"
                                            control={control}
                                            render={({ field }) => (
                                                <input
                                                    type="checkbox"
                                                    checked={field.value}
                                                    onChange={field.onChange}
                                                    id="status-checkbox"
                                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                            )}
                                        />
                                        <label htmlFor="status-checkbox" className="ml-2 text-sm font-medium text-gray-700">
                                            Hiển thị
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Hình ảnh */}
                            <div className="grid grid-cols-12 gap-6 items-start">
                                <label className="col-span-12 md:col-span-2 text-sm font-medium text-gray-700 md:pt-2.5">
                                    Hình ảnh
                                </label>
                                <div className="col-span-12 md:col-span-3">
                                    <UploadField
                                        name="image"
                                        control={control}
                                        label="Chọn hình ảnh"
                                    />
                                </div>
                            </div>

                            {/* 4. Mô tả ngắn */}
                            <div className="grid grid-cols-12 gap-6 items-start">
                                <label className="col-span-12 md:col-span-2 text-sm font-medium text-gray-700 md:pt-2.5">
                                    Mô tả ngắn <span className="text-red-500">*</span>
                                </label>
                                <div className="col-span-12 md:col-span-10">
                                    <Controller
                                        name="description"
                                        control={control}
                                        render={({ field }) => (
                                            <textarea
                                                {...field}
                                                rows={3}
                                                className={tailwindInputClasses + " resize-none"}
                                                placeholder="Nhập mô tả ngắn"
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            {/* 5. Mô tả chi tiết */}
                            <div className="grid grid-cols-12 gap-6 items-start">
                                <label className="col-span-12 md:col-span-2 text-sm font-medium text-gray-700 md:pt-2.5">
                                    Mô tả <span className="text-red-500">*</span>
                                </label>
                                <div className="col-span-12 md:col-span-10">
                                    <CKEditorField
                                        name="detail"
                                        control={control}
                                        label=""
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons*/}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
                            <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
                                <button
                                    type="button"
                                    onClick={handleFormSubmit}
                                    disabled={isLoading}
                                    className="px-3 sm:px-4 py-2 bg-[#337ab7] hover:bg-[#2e6da4] text-white rounded-lg flex items-center justify-center gap-1 sm:gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs sm:text-sm font-medium whitespace-nowrap cursor-pointer"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Save className="w-4 h-4" />
                                    )}
                                    <span>{isEditMode ? 'Lưu lại' : 'Thêm mới'}</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => navigate('/recruitment/manager')}
                                    disabled={isLoading}
                                    className="px-3 sm:px-4 py-2 bg-[#f0ad4e] hover:bg-[#e69c3b] text-white rounded-lg flex items-center justify-center gap-1 sm:gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs sm:text-sm font-medium whitespace-nowrap"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    <span>Trở về danh sách</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-12 py-6 text-center text-sm text-gray-500 border-t border-gray-200">
                    Copyright © 2025 by G&BSoft
                </footer>
            </div>
        </div>
    );
}