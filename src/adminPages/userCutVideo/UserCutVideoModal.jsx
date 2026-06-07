import React from 'react';

export default function UserCutVideoModal({
    showModal,
    setShowModal,
    editingUser,
    formData,
    handleSubmit,
    handleInputChange,
    isSubmitting
}) {
    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">
                    {editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Tên người dùng (Username) */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Tên người dùng *
                        </label>
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Nhập tên người dùng"
                            required
                        />
                    </div>

                    {/* Mật khẩu (Password) - Thường chỉ hiện khi thêm mới hoặc có logic đổi mật khẩu */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Mật khẩu *
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Nhập mật khẩu"
                            required
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded transition"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded transition disabled:bg-gray-400"
                        >
                            {isSubmitting ? 'Đang lưu...' : 'Lưu'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}