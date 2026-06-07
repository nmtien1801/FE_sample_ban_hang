import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getListRecruitment } from '../../redux/recruitmentSlice.js';
import ImageLoader from '../../components/FormFields/ImageLoader';
import ApiRecruitment from "../../apis/ApiRecruitment.js";

export default function RecruitmentManager() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { RecruitmentList, RecruitmentTotal } = useSelector((state) => state.recruitment);

  // 1. State quản lý phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const totalPages = Math.ceil(RecruitmentTotal / limit);

  // ========================================== INIT ========================================
  const fetchList = async () => {
    let res = await dispatch(getListRecruitment({ page: currentPage, limit: limit })).unwrap();
    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  useEffect(() => {
    fetchList();
  }, [currentPage]); // Lắng nghe sự thay đổi của currentPage

  // ========================================== ACTION ===============================================
  // 3. Hàm xử lý chuyển trang
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn lên đầu trang khi chuyển trang
    }
  };

  const handleDeletePost = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      try {
        let res = await ApiRecruitment.deleteRecruitmentApi(id);

        if (res && res.EC === 0) {
          toast.success(res.EM);
          fetchList();
        } else {
          toast.error(res.EM);
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        toast.error('Không thể xóa bài viết');
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-700 uppercase tracking-tight">Quản lý tuyển dụng</h2>
              <button
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
                onClick={() => { navigate('/recruitment/detail') }}
              >
                <Plus size={18} />
                Thêm mới
              </button>
            </div>

            {/* Danh sách tin */}
            <div className="p-6 space-y-6">
              {RecruitmentList && RecruitmentList.length > 0 ? (
                RecruitmentList.map((item) => (
                  <div key={item.id} className="flex flex-col md:flex-row gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group">
                    <div className="flex-shrink-0 w-28 h-24 flex items-center justify-center text-white text-[10px] font-bold rounded-lg uppercase shadow-sm">
                      <ImageLoader imagePath={item.image} className="w-full h-full rounded-md border object-cover" />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-gray-800 text-[15px] mb-1 group-hover:text-blue-600 transition-colors cursor-pointer">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 ml-4">
                          <button
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all cursor-pointer"
                            onClick={() => navigate('/recruitment/detail?id=' + item.id)}
                            title="Chỉnh sửa"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all cursor-pointer"
                            onClick={() => handleDeletePost(item.id)}
                            title="Xóa tin"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 italic leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-gray-400">Không có dữ liệu hiển thị.</div>
              )}
            </div>

            {/* 4. Giao diện Phân trang (Pagination UI) */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-center gap-2">

              {/* Nút Back */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>

              {/* Hiển thị các số trang */}
              {[...Array(Math.max(totalPages, 1))].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${currentPage === pageNumber
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100 border border-transparent"
                      }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              {/* Nút Next */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages <= 1}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={20} className="text-gray-600" />
              </button>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-right text-xs text-gray-400 font-medium">
          Copyright © 2025 by <span className="text-gray-600">CMICSTUDIO</span>
        </div>
      </div>
    </div>
  );
}