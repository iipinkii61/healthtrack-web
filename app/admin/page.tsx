"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "../../config/pusher";

const AdminPage = () => {
  const [activeForm, setActiveForm] = useState<any[]>([]);

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
            formData: data.formData,
          };
          return updatedForms;
        } else {
          // เพิ่ม user ใหม่
          return [
            ...prev,
            { userId: data.userId, formData: data.formData, status: "active" },
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
          form.userId === member.id ? { ...form, status: "inactive" } : form,
        ),
      );
    });

    return () => {
      pusherClient.unsubscribe("presence-channel");
    };
  }, []);

  console.log("Active forms:", activeForm);

  return (
    <div style={{ border: "1px solid blue", padding: "10px" }}>
      <h3>Admin (รอรับข้อมูลแบบ Real-time)</h3>

      {activeForm && (
        <div style={{ marginTop: "20px" }}>
          <h4>ข้อมูลที่กำลังพิมพ์:</h4>
          {activeForm.map((form) => (
            <div
              key={form.userId}
              style={{
                border: "1px solid gray",
                padding: "5px",
                marginBottom: "10px",
              }}
            >
              <strong>{form.userId}</strong>
              <pre>{JSON.stringify(form.formData, null, 2)}</pre>
              <p>Status: {form.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
