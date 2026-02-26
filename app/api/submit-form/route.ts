import { NextRequest } from "next/server";
import { pusherServer } from "../../../config/pusher";

export const POST = async (req: NextRequest) => {
  const data = await req.json();

  await pusherServer.trigger("presence-channel", "form-submitted", {
    id: data.id,
    status: data.status,
    submittedAt: new Date().toLocaleTimeString(),
  });

  return Response.json({ status: "Form submitted!" });
};
