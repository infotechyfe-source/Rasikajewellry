import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Check environment variables
    if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
      return NextResponse.json({ success: false, error: "Server configuration error" }, { status: 500 });
    }

    // Validate credentials
    if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    // Create JWT
    const token = jwt.sign(
      { role: "admin", username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set HTTP-only cookie
    const response = NextResponse.json({ success: true, message: "Login successful" });
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: true,      // MUST be true for SameSite=None
      sameSite: "none",  // cross-browser
      path: "/",         // site-wide
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (err) {
    console.error("Admin login error:", err);
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}
