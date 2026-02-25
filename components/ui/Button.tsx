interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode | string;
  className?: string;
  variant?: "solid" | "outline" | "default";
}

const Button = ({
  children,
  className = "",
  variant = "solid",
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyle =
    "flex justify-center items-center py-2 px-4 border text-sm font-medium rounded-lg transition-all duration-200";

  const variantStyles = {
    solid: "text-white bg-blue-600 border-transparent hover:bg-blue-700",
    outline: "bg-white border-blue-600 text-blue-600 hover:bg-blue-50",
    default: "bg-white border-gray-300 text-gray-800 hover:bg-gray-50",
  };

  const disabledStyle =
    "opacity-50 cursor-not-allowed bg-gray-200 border-gray-300 text-gray-500 hover:bg-gray-200";

  return (
    <button
      {...props}
      disabled={disabled}
      className={`
        ${baseStyle} 
        ${disabled ? disabledStyle : variantStyles[variant]} 
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
