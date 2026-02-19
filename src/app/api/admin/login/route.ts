import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const adminUser = process.env.ADMIN_USERNAME;
    const adminPass = process.env.ADMIN_PASSWORD;

    if (!adminUser || !adminPass || !process.env.JWT_SECRET) {
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    if (username !== adminUser || password !== adminPass) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    //  Create JWT
    const token = jwt.sign(
      { role: "admin", username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json(
      { success: true, message: "Login successful" },
      { status: 200 }
    );

    //  Set HTTP-only cookie
    response.cookies.set("admin_token", token, {
      httpOnly: true,                      // safe from JS access
      secure: true,                        // must be true for HTTPS in Vercel
      sameSite: "none",                     // allows cookie in all browsers/profiles
      path: "/",                            // available site-wide
      maxAge: 60 * 60 * 24,                 // 1 day
    });

    return response;

  } catch (err) {
    console.error("Admin login error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
