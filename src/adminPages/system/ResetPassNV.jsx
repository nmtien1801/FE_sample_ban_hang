import React, { useState, useEffect } from 'react';
import DropdownSearch from '../../components/FormFields/DropdownSearch';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getListStaff } from '../../redux/staffSlice';

export default function ResetPassNV() {
  const dispatch = useDispatch();
  const [selectedStaff, setSelectedStaff] = useState(null);
  const { listStaff } = useSelector((state) => state.staff);

  const handleSubmit = () => {
    if (!selectedStaff) {
      toast.warning("Vui lòng chọn nhân viên trước khi thực hiện!");
      return;
    }
    console.log('Xử lý đổi mật khẩu cho nhân viên:', selectedStaff);
    // Gọi API reset pass tại đây
  };

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

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex justify-center items-start">
      <div className="bg-white rounded-xl shadow-md border border-gray-200 w-full max-w-7xl overflow-hidden">
        {/* Header với màu nền nhẹ */}
        <div className="bg-gray-50/50 border-b border-gray-100 px-8 py-4 flex items-center gap-3">
          <h1 className="text-lg font-bold text-gray-800">Làm mới mật khẩu nhân viên</h1>
        </div>

        <div className="p-8 space-y-8">
          {/* Form Group */}
          <div className="flex flex-col md:flex-row gap-4">
            <label className="text-gray-700 text-sm font-medium md:w-32 md:text-left pt-2">
              Nhân viên <span className="text-red-500">*</span>
            </label>
            <div className="flex-1 space-y-2">
              <DropdownSearch
                options={listStaff}
                placeholder="--- Chọn nhân viên ---"
                labelKey="userName"
                valueKey="id"
                onChange={(e) => setSelectedStaff(e.id)}
              />

              <p className="text-xs text-gray-500 italic">
                * Mật khẩu sẽ được đặt lại về giá trị mặc định của hệ thống.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end border-t border-gray-100 pt-6">
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg"
            >
              Xác nhận đổi mật khẩu
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}