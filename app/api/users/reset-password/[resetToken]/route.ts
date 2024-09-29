import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/db";
import bcrypt from "bcryptjs";

interface DecodedToken {
  email: string;
}

interface ParamType {
  params: {
    resetToken: string;
  };
}
export async function PUT(
  request: Request,
  { params: { resetToken } }: ParamType
) {
  try {
    await connect();

    const { newPassword } = await request.json();

    const decoded = jwt.verify(
      resetToken,
      process.env.RESET_TOKEN_SECRET!
    ) as DecodedToken;

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashPassword;
    user.resetToken = "";
    await user.save();

    return NextResponse.json(
      { message: "Password changed successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
