import React, { useEffect, useRef, useState } from "react";
import {
    Outlet,
    useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../header/HeaderClient";
import Footer from "../footer";
import { ArrowUp } from "lucide-react";

function ClientLayout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const location = useLocation();

    const mainRef = useRef(null);

    // ================================================ SCROLL TO TOP ON ROUTE CHANGE ===========================================
    useEffect(() => {
        // Scroll to top when route changes
        if (mainRef.current) {
            mainRef.current.scrollTo({
                top: 0,
                behavior: "instant", // Use instant for immediate scroll, or "smooth" for smooth scroll
            });
        }
    }, [location.pathname]);

    useEffect(() => {
        const mainEl = mainRef.current;
        if (!mainEl) return;

        const handleScroll = () => {
            setShowScrollTop(mainEl.scrollTop > 300);
        };

        mainEl.addEventListener("scroll", handleScroll);
        return () => mainEl.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        if (mainRef.current) {
            mainRef.current.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="h-screen w-full bg-gray-50 text-gray-800 font-sans">
            <div className="flex flex-col h-full transition-all duration-300">
                {/* Header */}
                <Header
                    isMobileMenuOpen={isMobileMenuOpen}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                />

                {/* Main Content */}
                <main ref={mainRef} className="flex-1 overflow-y-auto">
                    <Outlet />
                    <Footer />
                </main>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={2000} // tự đóng sau 3 giây
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg transition-all z-50 hover:scale-110"
                    title="Lên đầu trang"
                >
                    <ArrowUp className="w-6 h-6" />
                </button>
            )}
        </div>
    );
}

export default ClientLayout;
