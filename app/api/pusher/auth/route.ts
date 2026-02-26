import { NextRequest, NextResponse } from "next/server";
import { pusherServer } from "../../../../config/pusher";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.formData();
    const socketId = data.get("socket_id") as string;
    const channel = data.get("channel_name") as string;

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
