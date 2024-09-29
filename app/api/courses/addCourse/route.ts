import { connect } from "@/dbConfig/db";
import Course from "@/models/courseModel";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connect();
    const {
      category,
      courseName,
      courseDescription,
      coursePrice,
      courseImage,
      skills,
      contentLang,
    } = await request.json();

    const newCourse = await Course.create({
      category,
      name: courseName,
      description: courseDescription,
      price: coursePrice,
      image: courseImage,
      skills,
      language: contentLang,
    });
    console.log(contentLang);

    return NextResponse.json(
      {
        message: "Course added successfully",
        success: true,
        course: newCourse,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add course" },
      { status: 500 }
    );
  }
}
