import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export const runtime = "nodejs";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow login page without token
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = req.cookies.get("admin_token")?.value;

  // ❌ If no token → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    console.log("JWT VERIFIED SUCCESS");
    return NextResponse.next();
  } catch {
    console.log("JWT VERIFY FAILED");
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
