import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { headers } from "next/headers";
import { connect } from "./dbConfig/db";

connect();
export function middleware(request: NextRequest) {
  try {
    const authHeader = headers().get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    return NextResponse.next();
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const config = {
  matcher: ["/api/users/user-details"],
};
