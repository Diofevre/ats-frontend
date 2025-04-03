import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { validateFile, ACCEPTED_IMAGE_TYPES, ACCEPTED_PDF_TYPES } from '@/lib/file-upload';

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
  }
});

async function uploadFileToS3(file: Buffer, fileName: string, contentType: string): Promise<string> {
  const uniqueFileName = `${Date.now()}-${fileName}`;
  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME as string,
    Key: `atsfile/${uniqueFileName}`,
    Body: file,
    ContentType: contentType,
    ACL: 'public-read' as const, // Add this line to make the file publicly readable
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  
  return `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/atsfile/${uniqueFileName}`;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const acceptedTypes = [...ACCEPTED_IMAGE_TYPES, ...ACCEPTED_PDF_TYPES];
    if (!validateFile(file, acceptedTypes)) {
      return NextResponse.json({ error: "Invalid file type or size." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileUrl = await uploadFileToS3(buffer, file.name, file.type);

    return NextResponse.json({ success: true, fileUrl });
  } catch (error: unknown) {
    console.error("Error uploading file:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}