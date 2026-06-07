import React, { useState, useEffect } from 'react';
import { Search, FileDown, Edit2, Trash2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import ApiAuth from '../../apis/ApiAuth';
import { getListUser } from '../../redux/authSlice';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import DropdownSearch from '../../components/FormFields/DropdownSearch';
import { TypeUserIDCons } from '../../utils/constants'
import EmployeeModal from './EmployeeModal';

export default function Employees() {
  const dispatch = useDispatch();
  const { UserList, UserTotal } = useSelector((state) => state.auth);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    image: '',
    phone: '',
    address: '',
    role: ''
  });

  const roleOptions = [
    { key: '', value: 'Tất cả vai trò' }, // Thêm dòng này
    ...Object.entries(TypeUserIDCons).map(([key, value]) => ({
      key: value,
      value: key
    }))
  ];

  // ========================================= FETCH INIT ============================
  useEffect(() => {
    fetchList();
  }, []);

  // Filter UserList when search or role filter changes
  useEffect(() => {
    filterEmployees();
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, roleFilter, UserList]);

  const fetchList = async () => {
    try {
      setIsLoading(true);
      const res = await dispatch(getListUser({ page: 1, limit: 10, role: roleFilter?.key || '' }));

    } catch (error) {
      console.error('Error fetching UserList:', error);
      toast.error('Không thể tải danh sách nhân viên');
    } finally {
      setIsLoading(false);
    }
  };

  // ================================== CRUD ===========================

  const filterEmployees = () => {
    let filtered = [...UserList];

    // 1. Lọc theo Search Term
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(emp =>
        emp.userName?.toLowerCase().includes(search) ||
        emp.email?.toLowerCase().includes(search) ||
        emp.phone?.includes(search)
      );
    }

    // 2. Lọc theo Role (Sửa ở đây)
    if (roleFilter && roleFilter.key) { // Kiểm tra nếu roleFilter tồn tại và có thuộc tính key
      filtered = filtered.filter(emp => {
        // emp.role thường là chuỗi 'admin', 'staff'...
        // roleFilter.key cũng là chuỗi 'admin', 'staff'...
        return String(emp.role).toLowerCase() === String(roleFilter.key).toLowerCase();
      });
    }

    setFilteredEmployees(filtered);
  };

  // MỞ MODAL THÊM
  const handleAddClick = () => {
    setEditingEmployee(null);
    setFormData({
      userName: '',
      email: '',
      image: '',
      phone: '',
      address: '',
      role: ''
    });
    setShowModal(true);
  };

  // MỞ MODAL SỬA
  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
    setFormData({
      id: employee.id || '',
      userName: employee.userName || '',
      email: employee.email || '',
      image: employee.image || '',
      phone: employee.phone || '',
      address: employee.address || '',
      role: employee.role || ''
    });
    setShowModal(true);
  };

  // XÓA
  const handleDeleteClick = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
      try {
        let res = await ApiAuth.deleteUserApi(id);
        if (res && res.EC === 0) {
          toast.success(res.EM);
          fetchList();
        } else {
          toast.error(res.EM);
        }
      } catch (error) {
        console.error('Error deleting employee:', error);
        toast.error('Không thể xóa nhân viên');
      }
    }
  };

  // SAVE
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if (!formData.userName || !formData.email || !formData.phone || !formData.role) {
      toast.info('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    try {
      if (editingEmployee) {
        // Update 
        let res = await ApiAuth.updateUserApi(editingEmployee.id, formData);
        if (res && res.EC === 0) {
          toast.success('Cập nhật nhân viên thành công');
          fetchList();
        }
      } else {
        // Add new employee
        let res = await ApiAuth.createUserApi(formData);
        if (res && res.EC === 0) {
          toast.success('Thêm mới nhân viên thành công');
          fetchList();
        } else {
          toast.error(res.EM);
        }
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving employee:', error);
      toast.error('Không thể lưu thông tin nhân viên');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExport = () => {
    // CSV export logic
    const headers = ['STT', 'Tên người dùng', 'Email', 'Số điện thoại', 'Địa chỉ', 'Vai trò'];
    const rows = filteredEmployees.map((emp, index) => [
      index + 1,
      emp.userName,
      emp.email,
      emp.phone,
      emp.address,
      emp.role
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'UserList.csv';
    a.click();
  };

  // ================================== Pagination logic ====================================
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <h1 className="text-2xl text-gray-600 mb-6">Quản lý nhân viên</h1>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 flex-1 min-w-[250px]">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, email, số điện thoại..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm w-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <DropdownSearch
                  options={roleOptions}
                  placeholder="--- Tìm theo vai trò ---"
                  labelKey="value"
                  valueKey="key"
                  onChange={(item) => setRoleFilter(item)}
                />
              </div>
            </div>

            <button
              onClick={handleAddClick}
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded flex items-center gap-2 text-sm"
            >
              <Plus size={16} />
              Thêm mới
            </button>

            <button
              onClick={handleExport}
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded flex items-center gap-2 text-sm"
            >
              <FileDown size={16} />
              Export
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 border-b-2 border-gray-300">
                <tr>
                  <th className="px-4 py-3 text-center text-gray-700 font-semibold border-r border-gray-300 whitespace-nowrap w-16">STT</th>
                  <th className="px-4 py-3 text-left text-gray-700 font-semibold border-r border-gray-300 whitespace-nowrap">Tên người dùng</th>
                  <th className="px-4 py-3 text-left text-gray-700 font-semibold border-r border-gray-300 whitespace-nowrap">Email</th>
                  <th className="px-4 py-3 text-center text-gray-700 font-semibold border-r border-gray-300 whitespace-nowrap">Số điện thoại</th>
                  <th className="px-4 py-3 text-left text-gray-700 font-semibold border-r border-gray-300 whitespace-nowrap">Địa chỉ</th>
                  <th className="px-4 py-3 text-center text-gray-700 font-semibold border-r border-gray-300 whitespace-nowrap">Vai trò</th>
                  <th className="px-4 py-3 text-center text-gray-700 font-semibold whitespace-nowrap">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                      Đang tải...
                    </td>
                  </tr>
                ) : filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                      Không có dữ liệu
                    </td>
                  </tr>
                ) : (
                  currentEmployees.map((employee, index) => (
                    <tr key={employee.id} className={`border-b border-gray-200 hover:bg-gray-50 ${index % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}>
                      <td className="px-4 py-3 border-r border-gray-200 text-center">{startIndex + index + 1}</td>
                      <td className="px-4 py-3 border-r border-gray-200">{employee.userName}</td>
                      <td className="px-4 py-3 border-r border-gray-200">{employee.email}</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-center">{employee.phone}</td>
                      <td className="px-4 py-3 border-r border-gray-200">{employee.address}</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-center">
                        <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-semibold">
                          {employee.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEditClick(employee)}
                            className="text-blue-500 hover:text-blue-700"
                            title="Chỉnh sửa"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(employee.id)}
                            className="text-red-500 hover:text-red-700"
                            title="Xóa"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Hiển thị {filteredEmployees.length === 0 ? 0 : startIndex + 1} đến {Math.min(endIndex, filteredEmployees.length)} của {filteredEmployees.length} nhân viên
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
              Trước
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded ${currentPage === page
                    ? 'bg-teal-500 text-white font-semibold'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Tiếp
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-right text-xs text-gray-500">
          Copyright © 2025 by CMICSTUDIO
        </div>
      </div>

      {/* Modal */}
      <EmployeeModal
        showModal={showModal}
        setShowModal={setShowModal}
        editingEmployee={editingEmployee}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        roleOptions={roleOptions}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}