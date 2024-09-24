import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/db";
import { generateResetToken } from "@/helpers/generateToken";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    await connect();
    const { email } = await request.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const resetToken = generateResetToken(user);
    user.resetToken = resetToken;
    await user.save();

    const resetUrl = `${process.env.DOMAIN}/auth/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "marjory.lowe@ethereal.email",
        pass: "KnqrnMzgEbW7NAkBFX",
      },
    });

    const info = await transporter.sendMail({
      from: "Himanshu Kashyap '<himanshu@gmail.com>'",
      to: email,
      subject: "Reset Your Password",
      text: `Click on this link to reset your password: ${resetUrl}`,
    });

    console.log(info.messageId);

    return NextResponse.json({ info, success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
