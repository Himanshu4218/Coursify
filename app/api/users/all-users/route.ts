import User from "@/models/userModel";
import { connect } from "@/dbConfig/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: Request) {
  try {
    await connect();

    const authHeader = headers().get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const accessToken = authHeader.split(" ")[1];
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);

    if (!(decoded as any).isAdmin) {
      return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
    }

    const allUsers = await User.find({
      email: { $ne: (decoded as any).email },
    }).select("-password -refreshToken");

    return NextResponse.json({ users: allUsers }, { status: 200 });
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
