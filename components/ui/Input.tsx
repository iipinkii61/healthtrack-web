import { UseFormRegister } from "react-hook-form";

interface InputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: keyof T;
  type?: string;
  required?: boolean;
  placeholder?: string;
  label?: string;
}

const Input = ({
  register,
  name,
  type,
  required = true,
  placeholder,
  label,
}: InputProps) => {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="text-[14px]">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        {...register(name, {
          required: required ? "This field is required" : false,
        })}
        id={name}
        name={name}
        type={type || "text"}
        required={required}
        className="mt-2 rounded-lg relative block w-full px-3 py-2 bg-white border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
        placeholder={
          placeholder || name.charAt(0).toUpperCase() + name.slice(1)
        }
      />
    </div>
  );
};

export default Input;
