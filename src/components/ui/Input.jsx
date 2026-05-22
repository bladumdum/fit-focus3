import React, { useState } from "react";
import { User, Lock, Eye, EyeOff, Mail } from "lucide-react";

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  iconType, // 'user' atau 'password'
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Menentukan ikon kiri berdasarkan prop iconType
  const renderLeftIcon = () => {
    if (iconType === "user") {
      return <User className="w-5 h-5 text-gray-400" />;
    }
    if (iconType === "email") {
      return <Mail className="w-5 h-5 text-gray-400" />;
    }
    if (iconType === "password") {
      return <Lock className="w-5 h-5 text-gray-400" />;
    }
    return null;
  };

  // Menentukan tipe input aktual (khusus untuk password toggle)
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="relative w-full mb-4">
      {/* Ikon Sisi Kiri */}
      {iconType && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          {renderLeftIcon()}
        </div>
      )}

      {/* Elemen Input Utama */}
      <input
        type={inputType}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full py-3.5 bg-[#f4f7fa] text-gray-700 placeholder-gray-400 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007953] focus:border-transparent transition-all duration-200
          ${iconType ? "pl-12" : "pl-4"} 
          ${type === "password" ? "pr-12" : "pr-4"}`}
      />

      {/* Toggle Visibilitas Password (Ikon Sisi Kanan) */}
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 focus:outline-none">
          {showPassword ? (
            <EyeOff className="w-5 h-5 text-gray-400" />
          ) : (
            <Eye className="w-5 h-5 text-gray-400" />
          )}
        </button>
      )}
    </div>
  );
};

export default Input;
