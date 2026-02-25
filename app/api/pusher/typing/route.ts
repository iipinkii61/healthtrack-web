import { pusherServer } from "@/config/pusher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, formData } = await req.json();
    await pusherServer.trigger("presence-channel", "typing-event", {
      userId,
      formData,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Pusher error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
