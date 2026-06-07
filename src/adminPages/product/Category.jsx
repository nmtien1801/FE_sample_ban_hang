import React, { useState, useEffect } from 'react';
import {
  ChevronsRight, ChevronDown, Folder, Plus, Edit2,
  Trash2, LayoutGrid, ChevronRight, PackagePlus, ChevronLeft, ChevronsLeft, Tag
} from 'lucide-react';
import ModelSelectProduct from './ModelSelectProduct.jsx'
import ApiCategory from '../../apis/ApiCategory.js';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getListCategory } from '../../redux/categorySlice.js';
import ModalAddCategory from './ModalAddCategory';

const CategoryItem = ({ item, depth = 0, onAddProduct, setShowAddModal, handleDeleteCategory, setParentIdToAdd , handleOpenEdit}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="select-none">
      <div
        className={`flex items-center justify-between p-3 hover:bg-gray-50 border-b border-gray-100 transition-colors group`}
        style={{ paddingLeft: `${depth * 24 + 12}px` }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-1 rounded hover:bg-gray-200 ${!hasChildren && 'invisible'}`}
          >
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>

          <Folder size={18} className={depth === 0 ? "text-blue-500" : "text-gray-400"} />

          <div className="flex flex-col">
            <span className="font-medium text-gray-700">{item.name}</span>
            <span className="text-[10px] text-gray-400 flex items-center gap-1">
              <Tag size={10} /> {item.productCount || 0} sản phẩm
            </span>
          </div>

          {item.status ? (
            <span className="px-2 py-0.5 text-xs bg-green-100 text-green-600 rounded-full text-[10px]">Active</span>
          ) : (
            <span className="px-2 py-0.5 text-xs bg-red-100 text-red-600 rounded-full text-[10px]">Hidden</span>
          )}
        </div>

        {/* Nhóm nút hành động */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onAddProduct(item)}
            className="flex items-center gap-1 p-1.5 text-green-600 hover:bg-green-50 rounded border border-green-100 text-xs font-medium"
            title="Thêm sản phẩm"
          >
            <PackagePlus size={14} /> <span className="hidden sm:inline">Thêm SP</span>
          </button>
          <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded border border-blue-100" title="Thêm con" onClick={() => {
            // Nếu item là gốc (parentId = null) → thêm con cho item này
            // Nếu item là con của ai đó → thêm danh mục cùng cấp (với parent của item)
            const parentId = item.parentId === null || item.parentId === undefined ? item.id : item.parentId;
            setParentIdToAdd(parentId);
            setShowAddModal(true);
          }}>
            <Plus size={14} />
          </button>
          <button className="p-1.5 text-amber-600 hover:bg-amber-50 rounded border border-amber-100" title="Sửa" onClick={() => handleOpenEdit(item)}>
            <Edit2 size={14} />
          </button>
          <button className="p-1.5 text-red-600 hover:bg-red-50 rounded border border-red-100" title="Xóa" onClick={() => handleDeleteCategory(item)}>
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {isOpen && hasChildren && (
        <div className="bg-gray-50/30">
          {item.children.map(child => (
            <CategoryItem key={child.id} item={child} depth={depth + 1} onAddProduct={onAddProduct} setShowAddModal={setShowAddModal} handleDeleteCategory={handleDeleteCategory} setParentIdToAdd={setParentIdToAdd} handleOpenEdit={handleOpenEdit} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function CategoryManager() {
  const dispatch = useDispatch();
  const { CategoryList, CategoryTotal } = useSelector((state) => state.category);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const totalPages = Math.ceil(CategoryTotal / pageSize);

  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [parentIdToAdd, setParentIdToAdd] = useState(null); // Lưu ID danh mục cha khi thêm con
  const [editData, setEditData] = useState(null);

  // ================================================ STATE DATA ===========================================
  const fetchList = async () => {
    setIsLoading(true);
    try {
      const res = await dispatch(getListCategory({ page: currentPage, limit: pageSize })).unwrap();
      
    } catch (error) {
      toast.error("Không thể tải danh sách danh mục");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, [currentPage, pageSize]);

  // ================================================ CRUD ================================================
  // --- HÀM XỬ LÝ THÊM DANH MỤC GỐC ---
  const handleSaveCategory = async (formData) => {
    setIsSubmitting(true);
    try {
      let res;
      if (editData) {
        // GỌI API CẬP NHẬT
        res = await ApiCategory.updateCategoryApi(editData.id, formData);
      } else {
        // GỌI API TẠO MỚI
        res = await ApiCategory.createCategoryApi(formData);
      }

      if (res && res.EC === 0) {
        toast.success(`${editData ? "Cập nhật" : "Thêm"} danh mục thành công!`);
        handleCloseModal();
        fetchList();
      } else {
        toast.error(res.EM);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // CHỈ MỞ KHI BẤM EDIT 
  const handleOpenEdit = (category) => {
    setEditData(category);
    setParentIdToAdd(category.parentId); // Giữ nguyên cha của nó
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditData(null);
    setParentIdToAdd(null);
  };

  // THÊM SẢN PHẨM VÀO DANH MỤC
  const onAddProduct = (category) => {
    setSelectedCategory(category);
    setShowProductModal(true);
  };

  // XÓA DANH MỤC
  const handleDeleteCategory = async (category) => {
    if (!window.confirm(`Bạn có chắc muốn xóa danh mục "${category.name}" không?`)) return;
    try {
      let res = await ApiCategory.deleteCategoryApi(category.id);
      if (res && res.EC === 0) {
        toast.success("Xóa danh mục thành công!");
        fetchList(); // Tải lại danh sách
      } else {
        toast.error(res.EM);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa danh mục!");
      console.error(error);
    }
  };

  return (
    <div className="max-w-0xl mx-auto p-6 bg-gray-50 min-h-screen relative">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <LayoutGrid className="text-indigo-600" /> Quản lý Danh mục
          </h1>
          <p className="text-gray-500 text-sm">Cấu trúc đa tầng & Quản lý sản phẩm</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-lg shadow-indigo-200"
          onClick={() => {
            setParentIdToAdd(null); // Reset khi thêm gốc
            setShowAddModal(true);
          }}>
          <Plus size={18} /> Thêm danh mục gốc
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 bg-gray-100/50 p-3 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
          <div className="ml-10">Tên danh mục / Thông tin</div>
        </div>

        <div className="divide-y divide-gray-100">
          {CategoryList.map(cat => (
            <CategoryItem
              key={cat.id}
              item={cat}
              onAddProduct={onAddProduct}
              setShowAddModal={setShowAddModal}
              handleDeleteCategory={handleDeleteCategory}
              setParentIdToAdd={setParentIdToAdd}
              handleOpenEdit={handleOpenEdit}
            />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Hiển thị <strong>{CategoryList.length}</strong> trên <strong>{CategoryTotal}</strong> danh mục
          </span>

          {/* Cho phép chọn số lượng hiển thị trên mỗi trang */}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1); // Reset về trang 1 khi đổi số lượng hiển thị
            }}
            className="text-sm border border-gray-300 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-teal-500"
          >
            {[5, 10, 20, 50].map(size => (
              <option key={size} value={size}>Hiện {size} dòng</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          {/* Trang đầu tiên */}
          <button
            disabled={currentPage === 1 || isLoading}
            onClick={() => setCurrentPage(1)}
            className="p-2 border rounded bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Trang đầu"
          >
            <ChevronsLeft size={16} />
          </button>

          {/* Trang trước */}
          <button
            disabled={currentPage === 1 || isLoading}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="p-2 border rounded bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Trang trước"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Thông tin trang hiện tại */}
          <div className="flex items-center px-4 h-9 border rounded bg-teal-50 border-teal-200">
            <span className="text-sm font-semibold text-teal-700">
              Trang {currentPage} / {totalPages || 1}
            </span>
          </div>

          {/* Trang sau */}
          <button
            disabled={currentPage >= totalPages || isLoading}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="p-2 border rounded bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Trang sau"
          >
            <ChevronRight size={16} />
          </button>

          {/* Trang cuối cùng */}
          <button
            disabled={currentPage >= totalPages || isLoading}
            onClick={() => setCurrentPage(totalPages)}
            className="p-2 border rounded bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Trang cuối"
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      </div>

      {/* Model thêm sản phẩm */}
      <ModelSelectProduct
        visible={showProductModal}
        onClose={() => {
          setShowProductModal(false);
          fetchList();
        }}
        form={selectedCategory}
      />

      {/* --- Model thêm danh mục --- */}
      <ModalAddCategory
        visible={showAddModal}
        onClose={handleCloseModal}
        onConfirm={handleSaveCategory}
        isLoading={isSubmitting}
        categories={CategoryList}
        parentIdToAdd={parentIdToAdd}
        editData={editData}
      />
    </div>
  );
}