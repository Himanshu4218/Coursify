import { connect } from "@/dbConfig/db";
import Course from "@/models/courseModel";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const skip = (page - 1) * limit;

    const courses = await Course.find({}).skip(skip).limit(limit);
    return NextResponse.json({ courses }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
