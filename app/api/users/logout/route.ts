import { connect } from "@/dbConfig/db";
import User from "@/models/userModel";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    const cookie = cookies().get("refreshToken");

    if (!cookie?.value) {
      return NextResponse.json({ message: "No token" }, { status: 401 });
    }
    const refreshToken = cookie.value;
    const user = await User.findOne({ refreshToken }).exec();

    if (!user) {
      cookies().delete("refreshToken");
    }

    user.refreshToken = "";
    await user.save();
    cookies().delete("refreshToken");

    return NextResponse.json({ message: "Logged out" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
