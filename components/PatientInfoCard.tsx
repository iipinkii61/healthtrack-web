import { EFormStatus } from "@/enum/form.enum";
import { IFormData } from "@/types/data.type";
import StatusTag from "./StatusTag";
import { UserIcon } from "./Icon";

const PatientInfoCard = ({ formData }: { formData: IFormData }) => {
  return (
    <div className="bg-white border-l-4 border-l-blue-600 rounded-xl shadow-sm mb-4 overflow-hidden border border-gray-100 font-prompt">
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm">
              <UserIcon />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 leading-tight">
                {formData.firstName || "-"} {formData.lastName || "-"}
              </h4>
              <p className="text-xs text-gray-500 font-medium">
                DOB: {formData.dateOfBirth || "-"}
              </p>
            </div>
          </div>
          <StatusTag status={formData.status as EFormStatus} />
        </div>

        <div className="grid grid-cols-2 gap-y-4 mb-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-0.5">
              Gender
            </p>
            <p className="text-sm text-gray-800 font-semibold capitalize">
              {formData.gender || "-"}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-0.5">
              Nationality
            </p>
            <p className="text-sm text-gray-800 font-semibold capitalize">
              {formData.nationality || "-"}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-0.5">
              Phone
            </p>
            <p className="text-sm text-gray-800 font-semibold">
              {formData.phone || "-"}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-0.5">
              Email
            </p>
            <p className="text-sm text-gray-800 font-semibold truncate pr-2">
              {formData.email || "-"}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-0.5">
            Address
          </p>
          <p className="text-sm text-gray-800 font-semibold leading-snug line-clamp-2">
            {formData.address || "-"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-y-4 mb-5">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-0.5">
              Language
            </p>
            <p className="text-sm text-gray-800 font-semibold">
              {formData.lang || "-"}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-0.5">
              Religion
            </p>
            <p className="text-sm text-gray-800 font-semibold">
              {formData.religion || "None"}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 shadow-inner">
          <p className="text-[10px] uppercase tracking-wider text-blue-600 font-bold mb-2 flex items-center gap-1">
            <span className="w-1 h-3 bg-blue-600 rounded-full inline-block"></span>
            Emergency Contact
          </p>
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm font-bold text-gray-900 truncate">
              {formData.emergencyName || "-"}
              <span className="ml-1 text-gray-500 font-medium text-xs">
                ({formData.emergencyRelationship || "-"})
              </span>
            </p>
            <p className="text-xs text-gray-600 font-bold whitespace-nowrap bg-white px-2 py-1 rounded-lg border border-gray-200">
              {formData.emergencyPhone || "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfoCard;
