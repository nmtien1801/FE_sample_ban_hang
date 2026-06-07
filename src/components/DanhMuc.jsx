import React, { useState, useRef, useEffect } from "react";
import { Package, ChevronRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { slug } from '../utils/constants.js';

const MegaMenu = ({ categories }) => {
  const [openCategory, setOpenCategory] = useState(null);
  const [openSubCategory, setOpenSubCategory] = useState(null);
  const closeTimeout = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
    };
  }, []);

  // Hàm điều hướng đến sản phẩm
  const handleNavigateToProduct = (cat, product, e) => {
    e.stopPropagation();
    navigate(`/${slug(product.name)}/${cat.id}/${product.id}`);
  };

  // Hàm điều hướng đến danh mục
  const handleNavigateByCateId = (cate, e) => {
    e.stopPropagation();
    navigate(`/${slug(cate.name)}/${cate.id}/all`);
  };

  return (
    <div className="w-64 bg-white border border-gray-200 rounded-xl shadow-2xl p-2 z-[2001]">
      <ul className="space-y-1">
        {categories?.map((cat) => {
          // Kiểm tra xem cha có nội dung gì để mở menu không
          const hasContent = (cat.children?.length > 0) || (cat.product?.length > 0);

          return (
            <li
              key={cat.id}
              className="relative"
              onMouseEnter={() => {
                if (closeTimeout.current) clearTimeout(closeTimeout.current);
                setOpenCategory(cat.id);
              }}
              onMouseLeave={() => {
                closeTimeout.current = setTimeout(() => {
                  setOpenCategory(null);
                  setOpenSubCategory(null);
                }, 300);
              }}
            >
              {/* LEVEL 1: CATEGORY CHA */}
              <div
                onClick={(e) => handleNavigateByCateId(cat, e)}
                className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors ${openCategory === cat.id ? "bg-orange-50 text-orange-600" : "text-gray-800 hover:bg-gray-50"
                  }`}
              >
                <span className="font-medium">{cat.name}</span>
                {hasContent && <ChevronRight className="w-4 h-4 opacity-50" />}
              </div>

              {/* LEVEL 2: SUB MENU (HIỆN CHILDREN VÀ PRODUCTS CỦA CHA) */}
              {openCategory === cat.id && hasContent && (
                <div className="absolute top-0 left-full ml-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl p-2 z-[2002]">
                  <ul className="space-y-1">

                    {/* --- PHẦN 1: HIỂN THỊ DANH MỤC CON --- */}
                    {cat.children?.map((sub) => (
                      <li
                        key={sub.id}
                        className="relative"
                        onMouseEnter={() => setOpenSubCategory(sub.id)}
                      >
                        <div
                          onClick={(e) => handleNavigateByCateId(sub, e)}
                          className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors ${openSubCategory === sub.id ? "bg-orange-50 text-orange-600" : "text-gray-800 hover:bg-gray-50"
                            }`}
                        >
                          <span className="font-medium text-sm">{sub.name}</span>
                          {sub.product?.length > 0 && <ChevronRight className="w-4 h-4 opacity-50" />}
                        </div>

                        {/* LEVEL 3: PRODUCTS CỦA SUB CATE */}
                        {sub.product?.length > 0 && openSubCategory === sub.id && (
                          <div className="absolute top-0 left-full ml-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl p-2 z-[2003] animate-in fade-in slide-in-from-left-2 duration-200">
                            <div className="space-y-1">
                              {sub.product.map((prod) => (
                                <div
                                  key={prod.id}
                                  onClick={(e) => handleNavigateToProduct(sub, prod, e)}
                                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 cursor-pointer text-sm transition-all group"
                                >
                                  <Package className="w-3.5 h-3.5 text-gray-300 group-hover:text-orange-400" />
                                  <div className="flex-1 line-clamp-1 font-medium">{prod.name}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </li>
                    ))}

                    {/* --- PHẦN 2: HIỂN THỊ PRODUCTS TRỰC THUỘC CHA (NẾU CÓ) --- */}
                    {cat.product?.length > 0 && (
                      <>
                        {cat.children?.length > 0 && <div className="my-2 border-t border-gray-100" />}
                        {cat.product.map((p) => (
                          <div
                            key={p.id}
                            onClick={(e) => handleNavigateToProduct(cat, p, e)}
                            className="flex items-center gap-2 p-3 rounded-md hover:bg-orange-50 hover:text-orange-600 cursor-pointer text-sm transition-colors group"
                          >
                            <Package className="w-4 h-4 text-gray-300 group-hover:text-orange-400" />
                            <span className="font-medium line-clamp-1">{p.name}</span>
                          </div>
                        ))}
                      </>
                    )}

                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MegaMenu;