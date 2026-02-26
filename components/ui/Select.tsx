import { UseFormRegister } from "react-hook-form";

type OptionType = {
  value: string;
  label: string;
};

interface SelectProps {
  options: OptionType[];
  label?: string;
  required?: boolean;
  register: UseFormRegister<any>;
  errorForm?: any;
  name: string;
}

const Select = ({
  options,
  label,
  required,
  register,
  errorForm,
  name,
}: SelectProps) => {
  return (
    <div>
      {label && (
        <label className="text-[14px]">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        {...register(name, { required: required })}
        className="mt-2 rounded-lg relative block w-full px-3 py-2 bg-white border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
      >
        <option value="">Select an option</option>
        {options.map((option: OptionType) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorForm && errorForm[name] && (
        <span className="text-xs text-red-500">
          {String(errorForm[name].message)}
        </span>
      )}
    </div>
  );
};

export default Select;
