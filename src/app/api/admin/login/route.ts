import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const adminUser = process.env.ADMIN_USERNAME;
    const adminPass = process.env.ADMIN_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET;

    if (!adminUser || !adminPass || !jwtSecret) {
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

    // ✅ Create JWT
    const token = jwt.sign(
      { role: "admin", username },
      jwtSecret,
      { expiresIn: "1d" }
    );

    // ✅ Return token instead of setting cookie
    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        token,
      },
      { status: 200 }
    );

  } catch (err) {
    console.error("Admin login error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
