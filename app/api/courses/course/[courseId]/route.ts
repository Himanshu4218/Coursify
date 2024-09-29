import { connect } from "@/dbConfig/db";
import Course from "@/models/courseModel";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    await connect();
    const { courseId } = params;

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    return NextResponse.json({ course }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
