"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "../../config/pusher";
import Table from "@/components/ui/Table";
import { IFormData } from "@/types/data.type";

const AdminPage = () => {
  const [activeForm, setActiveForm] = useState<IFormData[]>([]);

  useEffect(() => {
    const channel = pusherClient.subscribe("presence-channel");

    // ฟังเหตุการณ์ typing - อัพเดตข้อมูล user ที่มีอยู่แล้ว
    channel.bind("typing-event", (data: { userId: string; formData: any }) => {
      setActiveForm((prev) => {
        const existingFormIndex = prev.findIndex(
          (form) => form.userId === data.userId,
        );

        if (existingFormIndex !== -1) {
          // อัพเดตข้อมูลของ user ที่มีอยู่แล้ว
          const updatedForms = [...prev];
          updatedForms[existingFormIndex] = {
            ...updatedForms[existingFormIndex],
            ...data.formData,
          };
          return updatedForms;
        } else {
          return [
            ...prev,
            {
              id: data.userId,
              userId: data.userId,
              ...data.formData,
              status: "active",
            },
          ];
        }
      });
    });

    // ฟังเหตุการณ์ submit
    channel.bind(
      "form-submitted",
      (data: { userId: string; status: string }) => {
        setActiveForm((prev) =>
          prev.map((form) =>
            form.userId === data.userId ? { ...form, status: "submit" } : form,
          ),
        );
      },
    );

    // ฟังเหตุการณ์การเข้าและออกของ user
    channel.bind("pusher:member_removed", (member: any) => {
      setActiveForm((prev) =>
        prev.map((form) =>
          form.userId === member.id && form.status !== "submit"
            ? { ...form, status: "inactive" }
            : form,
        ),
      );
    });

    return () => {
      pusherClient.unsubscribe("presence-channel");
    };
  }, []);

  const columns = [
    { header: "ID", accessor: "userId" },
    {
      header: "Full Name",
      accessor: (row: IFormData) =>
        `${row.firstName} ${row.middleName ? row.middleName + " " : ""}${row.lastName}`,
    },
    { header: "Gender", accessor: "gender" },
    { header: "Date of Birth", accessor: "dateOfBirth" },
    { header: "Nationality", accessor: "nationality" },
    { header: "Emergency Contact", accessor: "emergencyContact" },
    {
      header: "Status",
      accessor: (row: IFormData) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === "active"
              ? "bg-green-100 text-green-700"
              : row.status === "submit"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-500"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  const TabButton = ({ label, active }: any) => (
    <button
      className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${active ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
    >
      {label}
    </button>
  );

  return (
    <>
      <div className="bg-white shadow-sm h-20 px-6 xl:px-10 flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>
      <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
        {/* --- Desktop View (Table) --- */}
        <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-50 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2 bg-gray-50 p-1 rounded-lg">
              <TabButton label="All (128)" active />
              <TabButton label="Submitted (92)" />
              <TabButton label="Active (12)" />
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm border rounded-lg flex items-center gap-2 hover:bg-gray-50">
                <span>Filter</span>
              </button>
              <button className="px-4 py-2 text-sm border rounded-lg flex items-center gap-2 hover:bg-gray-50">
                <span>Export</span>
              </button>
            </div>
          </div>
          <div>
            <Table columns={columns} data={activeForm} />
            <div className="p-4 border-t border-gray-50 flex justify-between items-center text-sm text-gray-500">
              <span>Showing 1 to 5 of 128 results</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 border rounded hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded">
                  1
                </button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- Mobile View (Cards) --- */}
        <div className="block md:hidden divide-y divide-gray-100">
          {activeForm.length > 0 ? (
            activeForm.map((user, idx) => (
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
                          {user.firstName ?? "-"} {user.lastName ?? "-"}
                        </h4>
                        <p className="text-xs text-gray-500 font-medium">
                          DOB: {user.dateOfBirth || "-"}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === "active"
                          ? "bg-green-100 text-green-700"
                          : user.status === "submit"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-4 mb-5">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                        Gender
                      </p>
                      <p className="text-sm text-gray-800 font-semibold capitalize">
                        {user.gender || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                        Nationality
                      </p>
                      <p className="text-sm text-gray-800 font-semibold">
                        {user.nationality || "-"}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                        Religion
                      </p>
                      <p className="text-sm text-gray-800 font-semibold">
                        {user.religion || "-"}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <p className="text-[10px] uppercase tracking-wider text-blue-600 font-bold mb-2">
                      Emergency Contact
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-bold text-gray-900">
                        {user.emergencyContact || "-"}
                      </p>
                      <p className="text-xs text-gray-500 font-medium">
                        +1 (555) 012-9988
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                No Data available
              </h3>
              <p className="text-sm text-gray-500">
                Currently, there are no active forms being filled out by users.
                Once users start filling out their forms, you will see their
                information here in real-time.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
