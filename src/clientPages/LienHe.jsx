import React, { useState } from 'react';
import { Home, Phone, Mail } from 'lucide-react';
import ContactForm from '../components/contact/FormContact';

const ContactPage = () => {
    // State để quản lý dữ liệu form (tùy chọn)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        content: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        // Logic xử lý gửi form (ví dụ: gọi API) sẽ được thêm ở đây
        alert('Đã gửi thông tin liên hệ!');
    };

    // Component Input Field tùy chỉnh
    const CustomInput = ({ name, placeholder, required = true, type = 'text' }) => (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={formData[name]}
            onChange={handleChange}
            required={required}
            className="w-full px-4 py-3 border border-gray-900 focus:outline-none focus:ring-2 focus:ring-black transition duration-200 text-base"
        />
    );

    return (
        <div className="min-h-screen bg-white">
            <main className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-16">

                {/* Tiêu đề trang (tùy chọn) */}
                <h1 className="text-4xl font-bold text-gray-900 mb-10">Liên Hệ Với Chúng Tôi</h1>

                {/* Grid chính: 2/3 (Contact) | 1/3 (Map) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* Left Column: Contact Info & Form */}
                    <div className="space-y-8">

                        {/* 1. Contact Information */}
                        <div className="space-y-4 text-gray-800">
                            {/* Địa chỉ */}
                            <div className="flex items-start gap-4">
                                <Home className="w-6 h-6 mt-1" />
                                <div>
                                    <p className="font-semibold">252/21/18 Phạm Văn Chiêu, Khu phố 30, Phường Thông Tây Hội, TP.HCM</p>
                                </div>
                            </div>

                            {/* Hotline đặt hàng */}
                            <div className="flex items-center gap-4">
                                <Phone className="w-6 h-6" />
                                <p>Hotline đặt hàng: 037.2672.396</p>
                            </div>

                            {/* Hotline truyền thông */}
                            <div className="flex items-center gap-4">
                                <Phone className="w-6 h-6" />
                                <p>Hotline truyền thông: 034. 7577. 034</p>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-4">
                                <Mail className="w-6 h-6" />
                                <p>contact@creatimichub.vn</p>
                            </div>
                        </div>

                        {/* 2. Contact Form */}
                        <ContactForm />
                    </div>

                    {/* Right Column: Map Placeholder */}
                    <div className="lg:min-h-full">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d979.6282912292106!2d106.64989492846674!3d10.848519316465875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDUwJzU0LjciTiAxMDbCsDM5JzAxLjkiRQ!5e0!3m2!1svi!2sus!4v1777905703551!5m2!1svi!2sus"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-[300px] md:h-[300px] lg:h-[630px] border-0 rounded-xl shadow-lg"
                        ></iframe>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ContactPage;