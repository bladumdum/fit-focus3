import { useState } from "react";
import Input from "../../components/ui/Input";
import mascot from "../../assets/icons/mascot.svg";
import smallMascot from "../../assets/icons/mascot.svg";
import Button from "../../components/ui/Button";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data Registrasi:", formData);
    // Jalankan logika pendaftaran akun di sini
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f9f9e0]">
      {/* Container Utama Kartu Register - Ukuran dan style sama persis dengan Login */}
      <div className="flex flex-col md:flex-row w-[90%] max-w-[1000px] bg-white rounded-[32px] overflow-hidden shadow-xl min-h-[550px]">
        {/* SISI KIRI: Branding & Maskot (Konsisten dengan LoginPage) */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 bg-[#007953] p-8 text-white relative text-center">
          <h1 className="text-4xl font-bold tracking-wide mb-2">FIT FOCUS</h1>
          <p className="text-sm font-medium opacity-90 max-w-[320px] leading-relaxed">
            Smart Productivity & Mental Wellness Assistant
          </p>

          {/* Ilustrasi Maskot */}
          <div className="mt-12 w-52 h-52 flex items-center justify-center">
            <img
              src={mascot}
              alt="Fit Focus Mascot"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* SISI KANAN: Form Input Register */}
        <div className="flex flex-col justify-center w-full md:w-1/2 p-10 md:p-14 bg-white">
          {/* Header Form */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-1">
                Selamat Datang
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                Yuk Daftar untuk mulai Perjalananmu
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
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              iconType="user"
            />

            {/* Input Email */}
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              iconType="email"
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

            {/* Spacer / Jarak Pemisah antara Form dan Button agar presisi sesuai gambar */}
            <div className="pt-4">
              {/* Tombol Daftar */}
              <Button type="submit">Daftar</Button>
            </div>
          </form>

          {/* Footer Form (Navigasi Kembali ke Login) */}
          <p className="text-xs text-center text-gray-600 mt-8 font-medium">
            Sudah punya akun ?{" "}
            <a
              href="#masuk"
              className="text-[#007953] font-semibold hover:underline transition-all">
              Masuk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
