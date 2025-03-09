import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

type FormDataFile = Blob & {
  name?: string;
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = ((await formData.get("file")) as FormDataFile) || null;
    const pathname = formData.get("pathname") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provide" }, { status: 400 });
    }

    const fileBuffer = await file.arrayBuffer();
    const base64File = Buffer.from(fileBuffer).toString("base64");

    const uploadResponse = await cloudinary.uploader.upload(
      `data:${file.type};base64,${base64File}`,
      {
        folder: pathname,
      }
    );
    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.log("Error uploading file to cloudinary:", error);
    return NextResponse.json(
      { error: "faild to upload image" },
      { status: 500 }
    );
  }
}
