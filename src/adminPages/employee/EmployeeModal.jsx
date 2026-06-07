import React from 'react';
import DropdownSearch from '../../components/FormFields/DropdownSearch';

export default function EmployeeModal({
    showModal,
    setShowModal,
    editingEmployee,
    formData,
    setFormData,
    handleSubmit,
    roleOptions,
    handleInputChange
}) {
    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">
                    {editingEmployee ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên mới'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
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

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Email *
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Nhập email"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Số điện thoại *
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Nhập số điện thoại"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Địa chỉ
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Nhập địa chỉ"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Ảnh đại diện
                        </label>
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="URL ảnh hoặc đường dẫn"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Vai trò *
                        </label>
                        <div className="flex-1 space-y-2">
                            <DropdownSearch
                                options={roleOptions}
                                placeholder="--- Tìm theo vai trò ---"
                                labelKey="value"
                                valueKey="key"
                                value={formData.role}
                                onChange={(item) => setFormData({ ...formData, role: item.key })}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            type="submit"
                            className="flex-1 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded text-sm font-semibold"
                        >
                            {editingEmployee ? 'Cập nhật' : 'Thêm mới'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded text-sm font-semibold"
                        >
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
