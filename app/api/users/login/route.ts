import User from "@/models/userModel";
import { connect } from "@/dbConfig/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/helpers/generateToken";

export async function POST(request: Request) {
  try {
    await connect();
    const { email, password } = await request.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "No such user exists." },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    cookies().set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return NextResponse.json({ accessToken });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Something went wrong during login." + error.message },
      { status: 500 }
    );
  }
}
