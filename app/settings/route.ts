import connectDb from "@/lib/db";
import Settings from "@/model/setting.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { ownerId, businessName, supportEmail, knowledge } = await req.json();

    if (!ownerId) {
      return NextResponse.json(
        { message: "owner id is required" },
        { status: 400 },
      );
    }

    await connectDb();
    const settings = await Settings.findOneAndUpdate(
      { ownerId },
      {
        $set: {
          businessName: businessName?.trim() ?? "",
          supportEmail: supportEmail?.trim() ?? "",
          knowledge: knowledge?.trim() ?? "",
        },
        $setOnInsert: { ownerId },
      },
      { new: true, upsert: true },
    );

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
