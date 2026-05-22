import { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Mascot from "../../assets/icons/mascot.svg";
import smallMascot from "../../assets/icons/smallMascot.svg";

// Jika Anda meletakkan logo/maskot di folder assets
// import logoFitFocus from '../assets/logo-fitfocus.png';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data Login:", formData);
    // Jalankan logika autentikasi atau arahkan ke halaman Mood Selection di sini
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f9f9e0]">
      {/* Container Utama Kartu Login */}
      <div className="flex flex-col md:flex-row w-[90%] max-w-[1000px] bg-white rounded-[32px] overflow-hidden shadow-xl min-h-[550px]">
        {/* SISI KIRI: Branding & Maskot */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 bg-[#007953] p-8 text-white relative text-center">
          <h1 className="text-4xl font-bold tracking-wide mb-2">FIT FOCUS</h1>
          <p className="text-sm font-medium opacity-90 max-w-[320px] leading-relaxed">
            Smart Productivity & Mental Wellness Assistant
          </p>

          {/* Ilustrasi Maskot (Ganti src dengan file asli Anda jika sudah ada) */}
          <div className="mt-12 w-52 h-52 flex items-center justify-center">
            <img
              src={Mascot}
              alt="Fit Focus Mascot"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* SISI KANAN: Form Input */}
        <div className="flex flex-col justify-center w-full md:w-1/2 p-10 md:p-14 bg-white">
          {/* Header Form */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-1">
                Selamat Datang
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                Masuk untuk melanjutkan aktivitasmu
              </p>
            </div>
            {/* Ikon Kecil di Kanan Atas */}
            <div className="w-12 h-12 flex items-center justify-center">
              <img
                src={smallMascot}
                alt="Small Icon"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Form Utama */}
          <form onSubmit={handleSubmit} className="space-y-1">
            {/* Input Username */}
            <Input
              type="text"
              name="username"
              placeholder="Username atau email"
              value={formData.username}
              onChange={handleChange}
              iconType="user"
            />

            {/* Input Password */}
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              iconType="password"
            />

            {/* Opsi Tambahan (Ingatkan Saya & Lupa Password) */}
            <div className="flex items-center justify-between pt-1 pb-6 text-sm">
              <label className="flex items-center space-x-2 text-gray-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#007953] bg-gray-100 border-gray-300 rounded focus:ring-[#007953] focus:ring-2 accent-[#007953]"
                />
                <span className="text-xs font-medium text-gray-600">
                  Ingatkan saya
                </span>
              </label>

              <a
                href="#lupa-password"
                className="text-xs font-medium text-gray-600 hover:text-gray-900 hover:underline transition-all">
                Lupa password ?
              </a>
            </div>

            {/* Tombol Masuk */}
            <Button type="submit">Masuk</Button>
          </form>

          {/* Footer Form (Daftar Akun Baru) */}
          <p className="text-xs text-center text-gray-600 mt-8 font-medium">
            Tidak punya akun ?{" "}
            <a
              href="#daftar"
              className="text-[#007953] font-semibold hover:underline transition-all">
              Daftar
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
