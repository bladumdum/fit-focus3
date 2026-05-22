import React, { useState } from "react";
import { User, Lock, Eye, EyeOff, Mail } from "lucide-react";

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  id,
  iconType, // 'user' | 'email' | 'password'
  readOnly = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Left icon based on iconType
  const renderLeftIcon = () => {
    if (iconType === "user") return <User className="w-5 h-5 text-gray-400" />;
    if (iconType === "email") return <Mail className="w-5 h-5 text-gray-400" />;
    if (iconType === "password") return <Lock className="w-5 h-5 text-gray-400" />;
    return null;
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="relative w-full">
      {/* Left Icon */}
      {iconType && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
          {renderLeftIcon()}
        </div>
      )}

      {/* Input Element */}
      <input
        id={id}
        type={inputType}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`
          w-full py-3.5 bg-white text-[#006A4E] placeholder-[#006A4E]/70
          border border-gray-200 rounded-full
          focus:outline-none focus:ring-2 focus:ring-[#006A4E]/40 focus:border-[#006A4E]
          transition-all duration-200 text-sm font-medium
          ${iconType ? "pl-12" : "pl-5"}
          ${type === "password" ? "pr-12" : "pr-5"}
          ${readOnly ? "cursor-default" : ""}
        `}
      />

      {/* Password Toggle */}
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      )}
    </div>
  );
};

export default Input;
