'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function uploadFileAction({ file, savePath }: { file: File; savePath: string }) {
  try {
    // 🧩 Get current session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) return 'Unauthorized: No user session found.';

    let user;

    try {
      user = await prisma.user.findUnique({
        where: {
          id: session?.user.id,
        },
      });
    } catch (error) {
      //   console.log(error);
      return 'Unauthorized: User not found.';
    }

    if (user?.role !== 'ADMIN') return 'Unauthorized: User is not an admin.';

    const uploadDir = path.join(process.cwd(), `/upload/${savePath}`);

    // 📁 Ensure directory exists
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    // 🧾 Prepare file metadata
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    // 💾 Save file to disk
    await fs.writeFile(filePath, fileBuffer);
    // 🗂️ Create database record
    const dbRecord = await prisma.file.create({
      data: {
        id: randomUUID(),
        fileName: file.name,
        filePath: path.relative(process.cwd(), filePath),
        mimeType: file.type || null,
        size: file.size ?? null,
        createdAt: new Date(),
        metadata: JSON.parse(
          JSON.stringify({
            savePath,
            name: file.name,
            size: file.size ?? null,
            type: file.type || null,
            lastModified: (file as any).lastModified ?? null,
          })
        ),
        uploadedBy: {
          connect: { id: session.user.id },
        },
      },
    });

    return {
      success: true,
      message: 'File uploaded successfully.',
      file: dbRecord,
    };
  } catch (error: any) {
    console.error('File Upload Error:', error);
    return {
      success: false,
      message: error.message || 'File upload failed.',
    };
  }
}
