import React, { useState, useEffect } from "react";
import { X, Save, Layers, Activity, FolderInput } from "lucide-react"; // Thêm icon FolderInput

const ModalAddCategory = ({ visible, onClose, onConfirm, isLoading, categories = [], parentIdToAdd = null, editData = null }) => {
    const [name, setName] = useState("");
    const [icon, setIcon] = useState("");
    const [status, setStatus] = useState(true);
    const [parentId, setParentId] = useState(""); // State lưu ID danh mục cha

    // --- HÀM ĐỆ QUY ĐỂ RENDER OPTIONS ---
    const renderCategoryOptions = (items, level = 0) => {
        return items.reduce((acc, cat) => {
            // Tạo khoảng thụt đầu dòng dựa trên cấp độ
            const prefix = level > 0 ? "— ".repeat(level) : "";

            // Thêm danh mục hiện tại vào list options
            acc.push(
                <option key={cat.id} value={cat.id}>
                    {prefix}{cat.name}
                </option>
            );

            // Nếu có children, tiếp tục đệ quy vào trong
            if (cat.children && cat.children.length > 0) {
                acc.push(...renderCategoryOptions(cat.children, level + 1));
            }

            return acc;
        }, []);
    };

    // Reset form khi mở modal
    useEffect(() => {
        if (visible) {
            if (editData) {
                // Nếu là chế độ SỬA
                setName(editData.name || "");
                setIcon(editData.icon || "");
                setStatus(editData.status ?? true);
                setParentId(editData.parentId ? String(editData.parentId) : "");
            } else {
                // Nếu là chế độ THÊM MỚI
                setName("");
                setIcon("");
                setStatus(true);
                setParentId(parentIdToAdd ? String(parentIdToAdd) : "");
            }
        }
    }, [visible, editData, parentIdToAdd]);

    if (!visible) return null;

    // ============================================ CRUD ============================================
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) {
            alert("Vui lòng nhập tên danh mục");
            return;
        }

        // Xử lý parentId: nếu là chuỗi rỗng "" thì gửi null, ngược lại parse sang số
        const finalParentId = parentId ? parseInt(parentId) : null;

        // Gửi dữ liệu ra ngoài
        onConfirm({
            name,
            icon,
            status,
            parentId: finalParentId,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <Layers className="text-indigo-600" size={20} />
                        {editData ? "Cập nhật danh mục" : "Thêm danh mục mới"}
                    </h3>
                    <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-5 space-y-4">

                    {/* Tên danh mục */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                            Tên danh mục <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ví dụ: Điện tử, Thời trang..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                            autoFocus
                        />
                    </div>

                    {/* Icon (Optional) */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">Icon (Class name)</label>
                        <input
                            type="text"
                            value={icon}
                            onChange={(e) => setIcon(e.target.value)}
                            placeholder="Ví dụ: fas fa-home"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                        />
                    </div>

                    {/* --- Chọn Danh mục cha --- */}
                    <div className="space-y-1.5 disabled:opacity-75 disabled:cursor-not-allowed">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                            <FolderInput size={16} className="text-gray-500" />
                            Danh mục cha (Tùy chọn)
                            {parentIdToAdd && <span className="text-xs text-orange-600 font-semibold">(Đã chọn)</span>}
                        </label>
                        <div className="relative">
                            <select
                                value={parentId}
                                onChange={(e) => setParentId(e.target.value)}
                                disabled={true} // Disable nếu có parentIdToAdd
                                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm appearance-none bg-white ${parentIdToAdd ? 'bg-gray-100 cursor-not-allowed opacity-75' : ''}`}
                            >
                                <option value="">-- Là danh mục gốc (Root) --</option>
                                {renderCategoryOptions(categories)}
                            </select>
                            {/* Icon mũi tên custom cho select */}
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">
                            {parentIdToAdd ? "Danh mục cha đã được tự động chọn." : "Để trống nếu đây là danh mục cao nhất."}
                        </p>
                    </div>

                    {/* Trạng thái */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Activity size={16} className={status ? "text-green-500" : "text-gray-400"} />
                            Trạng thái hoạt động
                        </label>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={status}
                                onChange={(e) => setStatus(e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        </label>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100 mt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-200"
                        >
                            <Save size={16} />
                            {isLoading ? "Đang lưu..." : "Lưu lại"}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Hủy bỏ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalAddCategory;