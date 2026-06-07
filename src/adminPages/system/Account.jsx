import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UpdateProfile } from '../../redux/authSlice';
import { toast } from 'react-toastify';

export default function UserInfoForm() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: userInfo.email || '',
    userName: userInfo.userName || '',
    role: userInfo.role || '',
    phone: userInfo.phone || '',
    address: userInfo.address || ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    let res = await dispatch(UpdateProfile(formData))
    if (res && res.payload && res.payload.EC === 0) {
      toast.success(res.payload.EM);
    }
    else {
      toast.error(res.payload.EM);
    }
  };

  const handleCancel = () => {
    // navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl text-red-600 mb-8 font-medium">Thông cá nhân người dùng</h1>

        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-8">

            {/* Họ và tên */}
            <div className="mb-6 flex items-center">
              <label className="text-gray-600 text-sm w-48 text-right pr-6">
                Họ và tên
              </label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Email */}
            <div className="mb-6 flex items-center">
              <label className="text-gray-600 text-sm w-48 text-right pr-6">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Phone */}
            <div className="mb-6 flex items-center">
              <label className="text-gray-600 text-sm w-48 text-right pr-6">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Địa chỉ */}
            <div className="mb-6 flex items-center">
              <label className="text-gray-600 text-sm w-48 text-right pr-6">
                Địa chỉ
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Vai trò */}
            <div className="mb-6 flex items-center">
              <label className="text-gray-600 text-sm w-48 text-right pr-6">
                Vai trò
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center">
              <div className="w-48"></div>
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded text-sm font-medium transition-colors"
                >
                  Lưu lại
                </button>
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded text-sm font-medium transition-colors"
                >
                  Bỏ qua
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-right text-xs text-gray-500">
          Copyright © 2025 by CMICSTUDIO
        </div>
      </div>
    </div>
  );
}