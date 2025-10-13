import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';
import connectDB from '~/lib/db/mongodb';
import Gallery from '~/lib/db/models/Gallery';
import { getSession } from '~/lib/auth/session';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Ensure upload directory exists
async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

// Get file type from mime type
function getFileType(mimeType: string): 'image' | 'video' | 'document' | 'other' {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.includes('pdf') || mimeType.includes('document')) return 'document';
  return 'other';
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const categoryId = formData.get('category') as string;
    const alt = formData.get('alt') as string;
    const caption = formData.get('caption') as string;

    if (!categoryId) {
      return NextResponse.json(
        { success: false, error: 'Category is required' },
        { status: 400 }
      );
    }

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit` },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'video/mp4',
      'video/webm',
      'application/pdf',
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'File type not allowed' },
        { status: 400 }
      );
    }

    // Ensure upload directory exists
    await ensureUploadDir();

    // Generate unique filename
    const ext = path.extname(file.name);
    const filename = `${nanoid()}-${Date.now()}${ext}`;
    const filepath = path.join(UPLOAD_DIR, filename);

    // Write file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Create database record
    await connectDB();

    const fileType = getFileType(file.type);
    const url = `/uploads/${filename}`;

    const gallery = await Gallery.create({
      filename,
      originalName: file.name,
      url,
      type: fileType,
      mimeType: file.type,
      size: file.size,
      alt,
      caption,
      category: categoryId,
      uploadedBy: session.userId,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'File uploaded successfully',
        data: gallery,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}







