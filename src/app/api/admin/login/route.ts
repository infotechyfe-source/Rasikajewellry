import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Fetch admin credentials from environment variables
    const adminUser = process.env.ADMIN_USERNAME;
    const adminPass = process.env.ADMIN_PASSWORD;

    if (!adminUser || !adminPass) {
      return NextResponse.json(
        { success: false, error: "Admin credentials not set in environment" },
        { status: 500 }
      );
    }

    if (username === adminUser && password === adminPass) {
      // Return a simple session token (replace with JWT in future)
      return NextResponse.json({ success: true, token: "admin-token" }, { status: 200 });
    }

    return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
  } catch (err) {
    console.error("Admin login error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
