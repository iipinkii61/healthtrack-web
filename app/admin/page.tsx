"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "../../config/pusher";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import { IFormData, ImemberEventData, IUserProfile } from "@/types/data.type";
import PatientInfoCard from "@/components/PatientInfoCard";
import { EFormStatus } from "@/enum/form.enum";
import Link from "next/link";
import StatusTag from "@/components/StatusTag";
import { PhoneIcon } from "@/components/Icon";

const AdminPage = () => {
  const [activeForm, setActiveForm] = useState<IFormData[]>([]);

  useEffect(() => {
    const channel = pusherClient.subscribe("presence-channel");

    // real-time sync form data
    channel.bind(
      "typing-event",
      (data: { id: string; formData: IUserProfile }) => {
        setActiveForm((prev) => {
          const existingFormIndex = prev.findIndex(
            (form) => form.id === data.id,
          );

          if (existingFormIndex !== -1) {
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
                id: data.id,
                ...data.formData,
                status: EFormStatus.ACTIVE,
              },
            ];
          }
        });
      },
    );

    // update status submitted
    channel.bind("form-submitted", (data: { id: string; status: string }) => {
      setActiveForm((prev) =>
        prev.map((form) =>
          form.id === data.id ? { ...form, status: EFormStatus.SUBMIT } : form,
        ),
      );
    });

    // when user is leaving channel
    channel.bind("pusher:member_removed", (member: ImemberEventData) => {
      setActiveForm((prev) => {
        const existingFormIndex = prev.findIndex(
          (form) => form.id === member.id,
        );

        if (existingFormIndex !== -1) {
          const updatedForms = [...prev];

          if (updatedForms[existingFormIndex].status !== "submit") {
            updatedForms[existingFormIndex] = {
              ...updatedForms[existingFormIndex],
              status: EFormStatus.INACTIVE,
            };
          }

          return updatedForms;
        } else {
          return [...prev];
        }
      });
    });

    return () => {
      pusherClient.unsubscribe("presence-channel");
    };
  }, []);

  const columns = [
    { header: "ID", accessor: "id" },
    {
      header: "Full Name",
      accessor: (row: IFormData) =>
        `${row.firstName} ${row.middleName ? row.middleName + " " : ""}${row.lastName}`,
    },
    { header: "Gender", accessor: "gender" },
    { header: "Date of Birth", accessor: "dateOfBirth" },
    { header: "Phone", accessor: "phone" },
    { header: "Email", accessor: "email" },
    { header: "Address", accessor: "address" },
    { header: "Preferred Language", accessor: "lang" },
    { header: "Nationality", accessor: "nationality" },
    { header: "Religion", accessor: "religion" },
    {
      header: "EMERGENCY CONTACT",
      accessor: (row: IFormData) => {
        return (
          <div className="flex flex-col py-1">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-gray-900 text-sm">
                {row?.emergencyName ?? "Not Provided"}
              </span>
              <span className="text-[11px] font-medium text-gray-400">
                ({row?.emergencyRelationship ?? "-"})
              </span>
            </div>

            <div className="flex items-center gap-1 text-gray-500 mt-0.5">
              <PhoneIcon />
              <span className="text-xs tracking-tight">
                {row?.emergencyPhone ?? "-"}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      header: "Status",
      accessor: (row: IFormData) => (
        <StatusTag status={row.status as EFormStatus} />
      ),
    },
  ];

  const TabButton = ({
    label,
    active,
  }: {
    label: string;
    active?: boolean;
  }) => (
    <button
      className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${active ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
    >
      {label}
    </button>
  );

  return (
    <>
      <div className="bg-white shadow-sm min-h-20 p-6 xl:px-10 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <Link href="/">
          <Button variant="outline">Logout</Button>
        </Link>
      </div>
      <div className="min-h-screen p-4 md:p-8">
        {/* --- Desktop View (Table) --- */}
        <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-7xl mx-auto">
          <div className="p-4 border-b border-gray-50 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2 bg-gray-50 p-1 rounded-lg">
              <TabButton label="All (128)" active />
              <TabButton label="Submitted (92)" />
              <TabButton label="Active (12)" />
            </div>
            <div className="flex gap-2">
              <Button variant="default">Export</Button>
            </div>
          </div>
          <div>
            <div className="px-4">
              <Table columns={columns} data={activeForm} />
            </div>
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
            activeForm.map((item, idx) => (
              <div key={idx}>
                <PatientInfoCard formData={item} />
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
