import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const POST = async (req: Request) => {
  try {
    const data = await req.formData();
    const file = data.get("file") as File;

    if (!file) return NextResponse.json({ success: false, error: "No file uploaded" });

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public", "images", fileName);

    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({ success: true, path: `/images/${fileName}` });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to upload image" });
  }
};
