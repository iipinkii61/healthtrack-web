import { NextResponse } from "next/server";
import { pusherServer } from "../../../config/pusher";

export const POST = async (req) => {
  const data = await req.formData();
  const socketId = data.get("socket_id");
  const channel = data.get("channel_name");

  const authResponse = pusherServer.authorizeChannel(socketId, channel);

  return NextResponse.json(authResponse);
};
