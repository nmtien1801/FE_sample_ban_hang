import React, { useState } from 'react';
import ApiContact from "../../apis/ApiContact";
import { toast } from 'react-toastify'

const CustomInput = ({ name, placeholder, required = true, type = 'text', value, onChange }) => (
    <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className=" bg-white w-full px-4 py-3 border border-gray-900 focus:outline-none focus:ring-2 focus:ring-black transition duration-200 text-base placeholder-gray-500"
    />
);

const ContactForm = () => {
    const [loading, setLoading] = useState(false);

    // State để quản lý dữ liệu form
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

    const handleSend = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const contactData = {
                name: formData.fullName,
                email: formData.email,
                message: formData.content + ` .Tôi đang quan tâm đến sản phẩm của bạn.Hãy liên hệ tới số điện thoại: ` + formData.phone,
            };
            await ApiContact.sendContactApi(contactData);
            toast.success('Đã gửi thông tin liên hệ thành công!');

            // Reset form sau khi gửi thành công
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                content: ''
            });
        } catch (error) {
            console.error('Error sending contact:', error);
            toast.error('Gửi thông tin liên hệ thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-orange-800 uppercase">Liên hệ với chúng tôi</h2>

            <form onSubmit={handleSend} className="space-y-4">
                <CustomInput
                    name="fullName"
                    placeholder="Họ và tên"
                    value={formData.fullName}
                    onChange={handleChange}
                />
                <CustomInput
                    name="email"
                    placeholder="Email (không bắt buộc)"
                    required={false}
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <CustomInput
                    name="phone"
                    placeholder="Số điện thoại"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                />
                <textarea
                    name="content"
                    placeholder="Nội dung"
                    rows="5"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    className="bg-white w-full px-4 py-3 border border-gray-900 focus:outline-none focus:ring-2 focus:ring-black transition duration-200 text-base resize-none"
                ></textarea>

                <button
                    type="submit"
                    disabled={loading}
                    className={`
                        px-8 py-3 text-lg font-bold transition duration-300 cursor-pointer
                        ${loading
                                            ? "bg-gray-500 cursor-not-allowed"
                                            : "bg-black hover:bg-gray-800"
                                        }
                        text-white
                    `}
                >
                    {loading ? "ĐANG GỬI..." : "GỬI"}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;