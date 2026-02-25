import { pusherServer } from "../../../config/pusher";

export const POST = async (req) => {
  const data = await req.json();

  // ส่ง event เพื่อแจ้งว่าฟอร์มได้ submit แล้ว (เปลี่ยน status เป็น submit)
  await pusherServer.trigger("presence-channel", "form-submitted", {
    userId: data.userId,
    status: data.status,
    submittedAt: new Date().toLocaleTimeString(),
  });

  return Response.json({ status: "Form submitted!" });
};
