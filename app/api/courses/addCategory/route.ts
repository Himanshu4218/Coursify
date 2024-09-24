import { connect } from "@/dbConfig/db";
import Category from "@/models/categoryModel";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connect();
    const { categoryName, categoryImage, categoryDescription } =
      await request.json();

    const category = await Category.findOne({
      name: categoryName,
    });

    if (category) {
      return NextResponse.json(
        { error: "Category already exists" },
        { status: 400 }
      );
    }
    const newCategory = await Category.create({
      name: categoryName,
      image: categoryImage,
      description: categoryDescription,
    });

    return NextResponse.json(
      {
        message: "Category created successfully",
        success: true,
        category: newCategory,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
