import { connect } from "@/dbConfig/db";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";

export const runtime = "nodejs"; // Ensure this runs in Node.js runtime

export async function GET(request: Request) {
  try {
    await connect();
    const authHeader = headers().get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const accessToken = authHeader.split(" ")[1];
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);

    const user = await User.findOne({ email: (decoded as any).email }).select(
      "-password -refreshToken"
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
