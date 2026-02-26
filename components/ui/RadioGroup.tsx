import { UseFormRegister } from "react-hook-form";

interface RadioProps {
  register: UseFormRegister<any>;
  errorForm?: any;
  label?: string;
  required?: boolean;
  name: string;
}

const RadioGroup = ({
  register,
  errorForm,
  label,
  required,
  name,
}: RadioProps) => {
  const genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  return (
    <div>
      {label && (
        <label className="text-[14px]">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="flex gap-3 mt-2">
        {genders.map((item) => (
          <label key={item.value} className="relative">
            <input
              type="radio"
              value={item.value}
              {...register(name, { required: required })}
              className="peer sr-only"
            />

            <div
              className="
              px-6 py-1 border-2 rounded-lg cursor-pointer transition-all text-center min-w-25
              /* สไตล์ตอนปกติ */
              border-gray-100 bg-gray-50 text-gray-500
              /* สไตล์ตอนที่ input ตัวข้างบนโดน Checked (ใช้ peer-checked) */
              peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-600
              /* สไตล์ตอน Hover */
              hover:bg-gray-100
            "
            >
              {item.label}
            </div>
          </label>
        ))}
      </div>
      {errorForm && errorForm[name] && (
        <span className="text-xs text-red-500">
          {String(errorForm[name].message)}
        </span>
      )}
    </div>
  );
};

export default RadioGroup;
