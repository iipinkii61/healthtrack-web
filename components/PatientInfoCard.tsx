import { EFormStatus } from "@/enum/form.enum";
import { IFormData } from "@/types/data.type";
import StatusTag from "./StatusTag";

const PatientInfoCard = ({ formData }: { formData: IFormData }) => {
  return (
    <div className="bg-white border-l-4 border-l-blue-600 rounded-xl shadow-sm mb-4 overflow-hidden border border-gray-100">
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 leading-tight">
                {formData.firstName ?? "-"} {formData.lastName ?? "-"}
              </h4>
              <p className="text-xs text-gray-500 font-medium">
                DOB: {formData.dateOfBirth || "-"}
              </p>
            </div>
          </div>
          <StatusTag status={formData.status as EFormStatus} />
        </div>

        <div className="grid grid-cols-2 gap-y-4 mb-5">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">
              Gender
            </p>
            <p className="text-sm text-gray-800 font-semibold capitalize">
              {formData.gender || "-"}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">
              Nationality
            </p>
            <p className="text-sm text-gray-800 font-semibold">
              {formData.nationality || "-"}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">
              Religion
            </p>
            <p className="text-sm text-gray-800 font-semibold">
              {formData.religion || "-"}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
          <p className="text-[10px] uppercase tracking-wider text-blue-600 font-bold mb-2">
            Emergency Contact
          </p>
          <div className="flex justify-between items-center">
            <p className="text-sm font-bold text-gray-900">
              {formData.emergencyContact || "-"}
            </p>
            <p className="text-xs text-gray-500 font-medium">
              +1 (555) 012-9988
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfoCard;
