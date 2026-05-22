const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3.5 bg-[#007953] hover:bg-[#006344] active:bg-[#005238] text-white font-semibold rounded-xl transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007953] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}>
      {children}
    </button>
  );
};

export default Button;
