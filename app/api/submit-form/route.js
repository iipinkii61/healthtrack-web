import { pusherServer } from "../../config/pusher";

export const POST = async (req) => {
  const data = await req.json();

  await pusherServer.trigger("private-channel", "new-entry", {
    id: data.userId,
    message: data.message,
    time: new Date().toLocaleTimeString(),
  });

  return Response.json({ status: "Sent!" });
};
