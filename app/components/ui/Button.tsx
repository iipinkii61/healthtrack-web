const Button = ({
  children,
  className = "",
  variant = "solid",
}: {
  children: React.ReactNode | string;
  className?: string;
  variant?: "solid" | "outline" | "default";
}) => {
  const baseStyle =
    "w-full flex justify-center py-2 px-4 border text-sm font-medium rounded-lg cursor-pointer";

  const variantStyles = {
    solid: "text-white bg-blue-600 hover:bg-blue-700",
    outline: "bg-white border-blue-600 text-blue-600",
    default: "bg-white border-gray-300 text-gray-800",
  };

  return (
    <button
      type="submit"
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
