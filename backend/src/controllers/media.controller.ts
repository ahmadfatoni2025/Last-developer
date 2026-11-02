import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import prisma from '../prisma/client';
import { createError } from '../middlewares/errorHandler';
import { MediaType } from '@prisma/client';

function getMimeMediaType(mime: string): MediaType {
  if (mime.startsWith('image/')) return 'IMAGE';
  if (mime.startsWith('video/')) return 'VIDEO';
  if (mime.includes('pdf') || mime.includes('document')) return 'DOCUMENT';
  return 'OTHER';
}

// POST /api/v1/media/upload
export const uploadMedia = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.file) throw createError('File tidak ditemukan.', 400);

    const file = req.file;
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const relPath = file.path.replace(process.cwd() + '/', '');
    const url = `${baseUrl}/${relPath}`;

    let width: number | undefined;
    let height: number | undefined;

    // Get image dimensions
    if (file.mimetype.startsWith('image/') && !file.mimetype.includes('svg')) {
      try {
        const meta = await sharp(file.path).metadata();
        width = meta.width;
        height = meta.height;
      } catch {
        // non-fatal
      }
    }

    const media = await prisma.media.create({
      data: {
        filename: file.filename,
        original: file.originalname,
        url,
        type: getMimeMediaType(file.mimetype),
        mimeType: file.mimetype,
        size: file.size,
        width,
        height,
        alt: req.body.alt,
        uploadedBy: req.user!.userId,
      },
    });

    res.status(201).json({ success: true, message: 'File berhasil diupload.', data: media });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/media
export const getMediaList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Number(req.query.limit) || 24);
    const skip = (page - 1) * limit;
    const type = req.query.type as MediaType | undefined;

    const where = type ? { type } : {};
    const [total, medias] = await Promise.all([
      prisma.media.count({ where }),
      prisma.media.findMany({
        where, skip, take: limit,
        orderBy: { createdAt: 'desc' },
        include: { uploader: { select: { id: true, name: true } } },
      }),
    ]);

    res.json({ success: true, data: medias, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/v1/media/:id
export const updateMedia = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { alt } = req.body;
    const media = await prisma.media.update({ where: { id }, data: { alt } });
    res.json({ success: true, data: media });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/media/:id
export const deleteMedia = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = String(req.params.id);
    const media = await prisma.media.findUnique({ where: { id } });
    if (!media) throw createError('Media tidak ditemukan.', 404);

    // Delete physical file
    const uploadDir = process.env.UPLOAD_DIR || 'uploads';
    const filePath = path.join(process.cwd(), uploadDir, path.basename(path.dirname(media.url.split('/').slice(-2).join('/'))), media.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await prisma.media.delete({ where: { id } });
    res.json({ success: true, message: 'Media berhasil dihapus.' });
  } catch (error) {
    next(error);
  }
};
