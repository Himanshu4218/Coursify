import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/db";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    await connect();
    const { username, email, password } = await request.json();

    const user = await User.findOne({ email });

    if (user) {
      NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        newUser,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
