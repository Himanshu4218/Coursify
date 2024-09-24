import { connect } from "@/dbConfig/db";
import Category from "@/models/categoryModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    const categories = await Category.find({});
    return NextResponse.json({ categories }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
