import React, { useState, useEffect } from 'react';
import { Search, FileDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Loader2, AlertCircle, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import FormProduct from './FormProduct';
import { useDispatch, useSelector } from 'react-redux';
import { getListProduct } from '../../redux/productSlice';
import ApiProduct from '../../apis/ApiProduct';
import ImageLoader from '../../components/FormFields/ImageLoader';

export default function ProductManager() {
  const dispatch = useDispatch();
  const [isShowProduct, setIsShowProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ============================================ States ============================================
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { ProductList, ProductTotal } = useSelector((state) => state.product);
  const totalPages = Math.ceil(ProductTotal / pageSize);


  const fetchList = async () => {
    setIsLoading(true);
    try {
      const res = await dispatch(getListProduct({ page: currentPage, limit: pageSize, keyword: searchTerm })).unwrap();
    } catch (error) {
      toast.error("Không thể tải danh sách sản phẩm");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, [currentPage, pageSize, searchTerm]);

  // tránh tìm liên tục 
  useEffect(() => {
    const t = setTimeout(() => {
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(t);
  }, [searchTerm]);

  // =========================================== CRUD Operations ===========================================
  // Hàm mở form thêm mới
  const handleAddNewProduct = () => {
    setSelectedProduct(null); // Reset về null để hiểu là thêm mới
    setIsShowProduct(true);
  };

  // Hàm mở form chỉnh sửa
  const handleEditProduct = (product) => {
    setSelectedProduct(product); // Truyền dữ liệu sản phẩm vào
    setIsShowProduct(true);
  };

  // Hàm xử lý xóa sản phẩm
  const handleDeleteProduct = async (product) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${product.name}" không?`)) {
      let res = await ApiProduct.deleteProductApi(product.id);
      if (res && res.EC === 0) {
        fetchList()
        toast.success("Xóa sản phẩm thành công!");
      } else {
        toast.error(res.EM);
      }
    }
  };

  // Hàm xử lý khi FormProduct gửi dữ liệu về
  const handleSubmitForm = async (formData) => {
    if (selectedProduct) {
      // Logic Update      
      let res = await ApiProduct.updateProductApi(selectedProduct.id, formData);
      if (res && res.EC === 0) {
        fetchList()
        toast.success("Cập nhật sản phẩm thành công!");
      } else {
        toast.error(res.EM);
      }
    } else {
      // Logic Create
      let res = await ApiProduct.createProductApi(formData);
      if (res && res.EC === 0) {
        fetchList()
        toast.success("Thêm sản phẩm thành công!");
      } else {
        toast.error(res.EM);
      }
    }
    setIsShowProduct(false);
  };

  const handleExportExcel = () => {
    const dataExport = ProductList.map((p, index) => ({
      "STT": index + 1,
      "Tên sản phẩm": p.name,
      "Mô tả": p.description,
      "Giá": p.price,
      "Trạng thái": p.status ? "Kinh doanh" : "Ngừng bán"
    }));
    const ws = XLSX.utils.json_to_sheet(dataExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sản phẩm");
    XLSX.writeFile(wb, "Danh_sach_san_pham.xlsx");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-0xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200">

        {/* Header & Actions */}
        <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Quản lý kho hàng</h1>
            <p className="text-sm text-gray-500">Xem và quản lý thông tin các sản phẩm trong hệ thống</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleExportExcel} className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              <FileDown size={18} /> Xuất file
            </button>
            <button className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
              onClick={() => handleAddNewProduct()}
            >
              <Plus size={18} /> Thêm mới
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-4 bg-gray-50/50 border-b border-gray-200 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm tên sản phẩm..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4 text-center w-16">STT</th>
                <th className="px-6 py-4">Sản phẩm</th>
                <th className="px-6 py-4">Mô tả</th>
                <th className="px-6 py-4">Giá bán</th>
                <th className="px-6 py-4 text-center">Trạng thái</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {isLoading ? (
                <tr><td colSpan="6" className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-teal-600" size={40} /></td></tr>
              ) : ProductList.map((item, idx) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-center text-gray-500 font-medium">
                    {(currentPage - 1) * pageSize + idx + 1}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <ImageLoader imagePath={item.image} className="w-10 h-10 rounded-md border object-cover" />
                      <span className="font-semibold text-gray-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 italic max-w-xs truncate">{item.description}</td>
                  <td className="px-6 py-4 font-bold text-teal-700">
                    {item.price.toLocaleString('vi-VN')} đ
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {item.status ? 'Đang bán' : 'Tạm ngưng'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      onClick={() => handleEditProduct(item)}>
                      <Edit size={18} />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      onClick={() => handleDeleteProduct(item)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              Hiển thị <strong>{ProductList.length}</strong> trên <strong>{ProductTotal}</strong> sản phẩm
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

        {/* Form Product */}
        {isShowProduct &&
          <FormProduct
            initialData={selectedProduct}
            onClose={() => setIsShowProduct(false)}
            onSubmit={handleSubmitForm} />
        }
      </div>
    </div>
  );
}