import React, { useState, useEffect } from 'react';
import { ShieldCheck, User, Save, CheckCircle2 } from 'lucide-react';
import DropdownSearch from '../../components/FormFields/DropdownSearch';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getListStaff } from '../../redux/staffSlice';

const PermissionPage = () => {
  const dispatch = useDispatch();
  const [selectedStaff, setSelectedStaff] = useState(null);
  const { listStaff } = useSelector((state) => state.staff);

  useEffect(() => {
    const fetchStaffList = async () => {
      try {
        let res = await dispatch(getListStaff());
        if (res.payload?.EC !== 0) {
          toast.error(res.payload?.EM || "Không thể tải danh sách nhân viên");
        }
      } catch (error) {
        toast.error("Lỗi kết nối hệ thống");
      }
    };

    if (listStaff.length === 0) {
      fetchStaffList();
    }
  }, [dispatch, listStaff.length]);

  // Dữ liệu giả lập
  const users = [
    { id: 1, name: 'Nguyễn Văn A', role: 'Nhân viên bán hàng' },
    { id: 2, name: 'Trần Thị B', role: 'Quản lý kho' },
    { id: 3, name: 'Lê Văn C', role: 'Chăm sóc khách hàng' },
  ];

  const permissionGroups = [
    {
      group: 'Quản lý Sản phẩm',
      permissions: ['Xem sản phẩm', 'Thêm mới', 'Chỉnh sửa', 'Xóa']
    },
    {
      group: 'Quản lý Đơn hàng',
      permissions: ['Xem đơn hàng', 'Cập nhật trạng thái', 'Hủy đơn']
    },
    {
      group: 'Hệ thống',
      permissions: ['Cấu hình chung', 'Xem báo cáo', 'Quản lý nhân sự']
    }
  ];

  const [selectedUser, setSelectedUser] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  // Xử lý khi chọn checkbox
  const togglePermission = (perm) => {
    if (selectedPermissions.includes(perm)) {
      setSelectedPermissions(selectedPermissions.filter(p => p !== perm));
    } else {
      setSelectedPermissions([...selectedPermissions, perm]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-800">
      <div className="max-w-0xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Phân quyền Nhân viên
            </h1>
            <p className="text-gray-500">Chọn nhân viên để thiết lập quyền truy cập hệ thống</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <DropdownSearch
                options={listStaff}
                placeholder="--- Chọn nhân viên ---"
                labelKey="userName"
                valueKey="id"
                onChange={(e) => setSelectedStaff(e.id)}
              />
            </div>
          </div>
        </div>

        {selectedUser ? (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Permissions Matrix */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {permissionGroups.map((group, idx) => (
                <div key={idx} className="border-b last:border-b-0 border-gray-100 p-6">
                  <h3 className="font-semibold text-gray-700 mb-4">{group.group}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {group.permissions.map((perm) => (
                      <label
                        key={perm}
                        className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${selectedPermissions.includes(perm)
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                          : 'bg-gray-50 border-gray-100 hover:border-gray-300'
                          }`}
                      >
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={selectedPermissions.includes(perm)}
                          onChange={() => togglePermission(perm)}
                        />
                        <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${selectedPermissions.includes(perm) ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-300'
                          }`}>
                          {selectedPermissions.includes(perm) && <CheckCircle2 size={14} className="text-white" />}
                        </div>
                        <span className="text-sm font-medium">{perm}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="flex justify-end gap-3 pt-4">
              <button className="px-6 py-2 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition">
                Hủy bỏ
              </button>
              <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 shadow-md transition">
                <Save size={18} />
                Lưu quyền hạn
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 p-20 text-center">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">Vui lòng chọn một nhân viên từ danh sách để bắt đầu thiết lập</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PermissionPage;