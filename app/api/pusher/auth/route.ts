import { NextResponse } from "next/server";
import { pusherServer } from "../../../../config/pusher";

export const POST = async (req: any) => {
  try {
    const data = await req.formData();
    const socketId = data.get("socket_id");
    const channel = data.get("channel_name");

    const randomName = "U-" + Math.floor(1000 + Math.random() * 9000);

    const presenceData = {
      user_id: randomName,
      user_info: { name: "Candidate User" },
    };
    const authResponse = pusherServer.authorizeChannel(
      socketId,
      channel,
      presenceData,
    );

    return NextResponse.json(authResponse);
  } catch (error) {
    console.error("Error in Pusher auth route:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 },
    );
  }
};
