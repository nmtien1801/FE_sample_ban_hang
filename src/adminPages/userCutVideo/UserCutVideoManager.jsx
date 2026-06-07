import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Loader2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from "react-toastify";
import ApiUserCutVideo from '../../apis/ApiUserCutVideo';
import UserCutVideoModal from './UserCutVideoModal';

export default function UserCutVideoManager() {
    // ============================================ States ============================================
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalUsers, setTotalUsers] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isShowModal, setIsShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Chỉ giữ lại userName và password
    const [formData, setFormData] = useState({
        userName: '',
        password: ''
    });

    const totalPages = Math.ceil(totalUsers / pageSize);

    // ============================================ Fetch Data ============================================
    const fetchList = async () => {
        setIsLoading(true);
        try {
            const res = await ApiUserCutVideo.getListApi(currentPage, pageSize, searchTerm);
            if (res.EC === 0) {
                // Tùy vào cấu trúc API của bạn để set dữ liệu
                setUsers(res.DT.data || res.DT);
                setTotalUsers(res.DT.total || res.DT.length || 0);
            } else {
                toast.error(res.EM || "Không thể tải danh sách");
            }
        } catch (error) {
            console.error(error);
            toast.error("Lỗi khi tải danh sách người dùng");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchList();
    }, [currentPage, pageSize, searchTerm]);

    // ============================================ CRUD Operations ============================================
    const handleAddNew = () => {
        setEditingUser(null);
        setFormData({
            userName: '',
            password: ''
        });
        setIsShowModal(true);
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData({
            userName: user.userName || user.userName || '',
            password: '' // Thường để trống mật khẩu khi sửa trừ khi muốn đổi
        });
        setIsShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            let res;
            if (editingUser) {
                res = await ApiUserCutVideo.updateUserApi(editingUser.id || editingUser._id, formData);
            } else {
                res = await ApiUserCutVideo.createUserApi(formData);
            }

            if (res.EC === 0) {
                toast.success(editingUser ? 'Cập nhật thành công' : 'Tạo mới thành công');
                setIsShowModal(false);
                fetchList();
            } else {
                toast.error(res.EM || 'Có lỗi xảy ra');
            }
        } catch (error) {
            toast.error('Lỗi khi lưu dữ liệu');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) return;
        try {
            const res = await ApiUserCutVideo.deleteUserApi(id);
            if (res.EC === 0) {
                toast.success('Xóa thành công');
                fetchList();
            } else {
                toast.error(res.EM || 'Có lỗi xảy ra');
            }
        } catch (error) {
            toast.error('Lỗi khi xóa');
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6 flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Quản lý Tài khoản</h1>
                        <p className="text-gray-500 text-sm">Quản lý quyền truy cập hệ thống cắt video</p>
                    </div>
                    <button
                        onClick={handleAddNew}
                        className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg transition shadow-sm"
                    >
                        <Plus size={18} /> Thêm mới
                    </button>
                </div>

                {/* Search Bar */}
                <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Tìm tên tài khoản..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    {isLoading ? (
                        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-teal-600" size={40} /></div>
                    ) : users.length === 0 ? (
                        <div className="py-20 text-center text-gray-500">
                            <AlertCircle className="mx-auto mb-2 opacity-20" size={48} />
                            Không tìm thấy người dùng nào
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">STT</th>
                                    <th className="px-6 py-4 font-semibold">Tên tài khoản</th>
                                    <th className="px-6 py-4 text-center font-semibold">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {users.map((user, index) => (
                                    <tr key={user.id || user._id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 text-sm">{index + 1 + (currentPage - 1) * pageSize}</td>
                                        <td className="px-6 py-4 font-medium text-gray-800">{user.userName || user.userName}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center gap-2">
                                                <button onClick={() => handleEdit(user)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={18} /></button>
                                                <button onClick={() => handleDelete(user.id || user._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                        <span>Trang {currentPage} / {totalPages}</span>
                        <div className="flex gap-2">
                            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 border rounded-lg disabled:opacity-30"><ChevronLeft size={18} /></button>
                            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 border rounded-lg disabled:opacity-30"><ChevronRight size={18} /></button>
                        </div>
                    </div>
                )}
            </div>

            <UserCutVideoModal
                showModal={isShowModal}
                setShowModal={setIsShowModal}
                editingUser={editingUser}
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
                isSubmitting={isSubmitting}
            />
        </div>
    );
}