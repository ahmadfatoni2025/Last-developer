import { Request, Response, NextFunction } from 'express';
import slugify from 'slugify';
import prisma from '../prisma/client';
import { createError } from '../middlewares/errorHandler';

// GET /api/v1/categories
export const getCategories = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { posts: true } } },
    });
    res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/categories
export const createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, description } = req.body;
    const slug = slugify(name, { lower: true, strict: true });

    const cat = await prisma.category.create({ data: { name, slug, description } });
    res.status(201).json({ success: true, data: cat });
  } catch (error) {
    next(error);
  }
};

// PUT /api/v1/categories/:id
export const updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { name, description } = req.body;
    const slug = slugify(name, { lower: true, strict: true });

    const cat = await prisma.category.update({ where: { id }, data: { name, slug, description } });
    res.json({ success: true, data: cat });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/categories/:id
export const deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = String(req.params.id);
    const cat = await prisma.category.findUnique({ where: { id }, include: { _count: { select: { posts: true } } } });
    if (!cat) throw createError('Kategori tidak ditemukan.', 404);
    if (cat._count.posts > 0) throw createError(`Tidak dapat dihapus: ${cat._count.posts} artikel menggunakan kategori ini.`, 400);

    await prisma.category.delete({ where: { id } });
    res.json({ success: true, message: 'Kategori dihapus.' });
  } catch (error) {
    next(error);
  }
};

// ─── Tags ────────────────────────────────────────────

// GET /api/v1/tags
export const getTags = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { posts: true } } },
    });
    res.json({ success: true, data: tags });
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/tags
export const createTag = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name } = req.body;
    const slug = slugify(name, { lower: true, strict: true });
    const tag = await prisma.tag.create({ data: { name, slug } });
    res.status(201).json({ success: true, data: tag });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/tags/:id
export const deleteTag = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = String(req.params.id);
    await prisma.tag.delete({ where: { id } });
    res.json({ success: true, message: 'Tag dihapus.' });
  } catch (error) {
    next(error);
  }
};
