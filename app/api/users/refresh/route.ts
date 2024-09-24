import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig/db";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { cookies } from "next/headers";
import { generateAccessToken } from "@/helpers/generateToken";

interface DecodedToken {
  email: string;
}

export async function GET() {
  try {
    await connect();
    const cookie = cookies().get("refreshToken");

    if (!cookie?.value) {
      return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
    }

    const refreshToken = cookie?.value;

    const user = await User.findOne({ refreshToken }).exec();

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const decoded = (await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    )) as DecodedToken;

    if (decoded.email !== user.email) {
      return NextResponse.json(
        { error: "Invalid refresh token" },
        { status: 401 }
      );
    }
    const accessToken = generateAccessToken(user);

    return NextResponse.json({ accessToken });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
