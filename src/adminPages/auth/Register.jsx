import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Register } from "../../redux/authSlice";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword || !email || !phone) {
      alert("Vui lòng nhập đầy đủ thông tin bắt buộc.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Mật khẩu và nhập lại mật khẩu không khớp.");
      return;
    }

    const body = { username, password, email, phone, address };

    try {
      const res = await dispatch(Register(body));
      if (res && res.payload.EC === 0) {
        alert("Đăng ký thành công!");
        navigate("/login");
      } else {
        alert(res.payload.EM || "Đăng ký thất bại.");
      }
    } catch (error) {
      console.error("Register error:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-xs sm:max-w-[360px] bg-white p-4 sm:p-0 text-center">
        <div className="mb-6">
          <div className="mx-auto w-32 h-32 mb-4">
            <img src="/logo.png" alt="HCA Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="flex-grow border-t border-gray-300 max-w-[40px]"></div>
            <h1 className="text-xl text-gray-700 font-light tracking-wide">Đăng ký</h1>
            <div className="flex-grow border-t border-gray-300 max-w-[40px]"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4 text-left">
            <label className="block text-gray-700 text-sm mb-1">Username *</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500 placeholder-gray-400 text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4 text-left">
            <label className="block text-gray-700 text-sm mb-1">Email *</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500 placeholder-gray-400 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-4 text-left">
            <label className="block text-gray-700 text-sm mb-1">Phone *</label>
            <input
              type="text"
              placeholder="Enter your phone"
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500 placeholder-gray-400 text-sm"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* Address */}
          <div className="mb-4 text-left">
            <label className="block text-gray-700 text-sm mb-1">Address</label>
            <input
              type="text"
              placeholder="Enter your address"
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500 placeholder-gray-400 text-sm"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-4 text-left relative">
            <label className="block text-gray-700 text-sm mb-1">Password *</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500 placeholder-gray-400 text-sm pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-6 text-left relative">
            <label className="block text-gray-700 text-sm mb-1">Confirm Password *</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500 placeholder-gray-400 text-sm pr-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-2">
            <button
              type="submit"
              className="w-[90px] py-2 text-sm text-black border border-gray-300 bg-white hover:bg-gray-50 transition duration-150 rounded-sm"
            >
              Đăng ký
            </button>
            <button
              type="button"
              className="w-[90px] py-2 text-sm text-black border border-gray-300 bg-white hover:bg-gray-50 transition duration-150 rounded-sm"
              onClick={() => navigate("/login")}
            >
              Đăng nhập
            </button>
          </div>
        </form>

        <div className="w-full border-t border-gray-300 mt-8 mb-4"></div>
        <div className="text-center">
          <h2 className="text-lg text-gray-600 font-light tracking-widest mb-1">CMICSTUDIO</h2>
          <p className="text-xs text-gray-500">
            &copy;{new Date().getFullYear()} All Rights Reserved. Privacy and Terms
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
