import { EFormStatus } from "@/enum/form.enum";

const StatusTag = ({ status }: { status: EFormStatus }) => {
  const statusStyles = {
    active: "bg-green-100 text-green-700",
    submit: "bg-blue-100 text-blue-700",
    inactive: "bg-gray-100 text-gray-500",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`}
    >
      {status}
    </span>
  );
};

export default StatusTag;
