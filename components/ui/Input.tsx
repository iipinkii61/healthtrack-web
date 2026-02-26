import { EMAIL_REGEX, PHONE_REGEX } from "@/constant/validate.contant";
import { UseFormRegister } from "react-hook-form";

interface InputProps {
  register: UseFormRegister<any>;
  errorForm?: any;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  label?: string;
  maxLength?: number;
}

const Input = ({
  register,
  errorForm,
  name,
  type,
  required = true,
  placeholder,
  label,
  maxLength,
}: InputProps) => {
  const validationRules = () => {
    switch (type) {
      case "email":
        return {
          value: EMAIL_REGEX,
          message: "Invalid email address",
        };
      case "tel":
        return {
          value: PHONE_REGEX,
          message: "Invalid phone number format",
        };
      default:
        return undefined;
    }
  };

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
          maxLength: maxLength
            ? {
                value: maxLength,
                message: `${label || name} must not exceed ${maxLength} characters`,
              }
            : undefined,
          pattern: validationRules() || undefined,
        })}
        id={name}
        name={name}
        type={type || "text"}
        required={required}
        className="mt-2 rounded-lg relative block w-full px-3 py-2 bg-white border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
        placeholder={placeholder || label}
      />
      {errorForm && errorForm[name] && (
        <span className="text-xs text-red-500">
          {String(errorForm[name].message)}
        </span>
      )}
    </div>
  );
};

export default Input;
