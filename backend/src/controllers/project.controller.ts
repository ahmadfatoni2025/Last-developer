import { Request, Response, NextFunction } from 'express';
import slugify from 'slugify';
import prisma from '../prisma/client';
import { createError } from '../middlewares/errorHandler';

// GET /api/v1/projects  (public)
export const getProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Number(req.query.limit) || 12);
    const skip = (page - 1) * limit;
    const featured = req.query.featured === 'true';
    const isAdmin = req.user?.role === 'ADMIN' || req.user?.role === 'EDITOR';

    const where: Record<string, unknown> = {
      ...(!isAdmin && { status: 'PUBLISHED' }),
      ...(featured && { featured: true }),
    };

    const [total, projects] = await Promise.all([
      prisma.project.count({ where }),
      prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
        include: { author: { select: { id: true, name: true } } },
      }),
    ]);

    res
      .set('X-Total-Count', String(total))
      .json({ success: true, data: projects, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/projects/:slug
export const getProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const slug = String(req.params.slug);
    const isAdmin = req.user?.role === 'ADMIN' || req.user?.role === 'EDITOR';

    const project = await prisma.project.findUnique({
      where: { slug },
      include: { author: { select: { id: true, name: true, avatar: true } } },
    });

    if (!project) throw createError('Project tidak ditemukan.', 404);
    if (!isAdmin && project.status !== 'PUBLISHED') throw createError('Project tidak ditemukan.', 404);

    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/projects
export const createProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, description, content, coverImage, techStack, liveUrl, githubUrl, status, featured, order } = req.body;

    let slug = slugify(title, { lower: true, strict: true });
    const dup = await prisma.project.findUnique({ where: { slug } });
    if (dup) slug = `${slug}-${Date.now()}`;

    const project = await prisma.project.create({
      data: {
        title, slug, description, content, coverImage,
        techStack: techStack || [],
        liveUrl, githubUrl,
        status: status || 'DRAFT',
        featured: featured || false,
        order: order || 0,
        authorId: req.user!.userId,
      },
    });

    res.status(201).json({ success: true, message: 'Project berhasil dibuat.', data: project });
  } catch (error) {
    next(error);
  }
};

// PUT /api/v1/projects/:id
export const updateProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = String(req.params.id);
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) throw createError('Project tidak ditemukan.', 404);

    const { title, description, content, coverImage, techStack, liveUrl, githubUrl, status, featured, order } = req.body;

    let slug = existing.slug;
    if (title && title !== existing.title) {
      slug = slugify(title, { lower: true, strict: true });
      const dup = await prisma.project.findFirst({ where: { slug, NOT: { id: id } } });
      if (dup) slug = `${slug}-${Date.now()}`;
    }

    const project = await prisma.project.update({
      where: { id },
      data: { title, slug, description, content, coverImage, techStack, liveUrl, githubUrl, status, featured, order },
    });

    res.json({ success: true, message: 'Project berhasil diperbarui.', data: project });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/projects/:id
export const deleteProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = String(req.params.id);
    await prisma.project.findUniqueOrThrow({ where: { id } }).catch(() => {
      throw createError('Project tidak ditemukan.', 404);
    });
    await prisma.project.delete({ where: { id } });
    res.json({ success: true, message: 'Project berhasil dihapus.' });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/v1/projects/reorder
export const reorderProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { orders } = req.body as { orders: { id: string; order: number }[] };

    await Promise.all(
      orders.map(({ id, order }) => prisma.project.update({ where: { id }, data: { order } }))
    );

    res.json({ success: true, message: 'Urutan project berhasil diperbarui.' });
  } catch (error) {
    next(error);
  }
};
