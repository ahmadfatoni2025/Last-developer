import { Request, Response, NextFunction } from 'express';
import slugify from 'slugify';
import prisma from '../prisma/client';
import { createError } from '../middlewares/errorHandler';

// GET /api/v1/posts  (public)
export const getPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Number(req.query.limit) || 10);
    const skip = (page - 1) * limit;
    const categorySlug = req.query.category as string | undefined;
    const tagSlug = req.query.tag as string | undefined;
    const search = req.query.search as string | undefined;
    const isAdmin = req.user?.role === 'ADMIN' || req.user?.role === 'EDITOR';

    const where: Record<string, unknown> = {
      ...(!isAdmin && { status: 'PUBLISHED' }),
      ...(categorySlug && { category: { slug: categorySlug } }),
      ...(tagSlug && { tags: { some: { tag: { slug: tagSlug } } } }),
      ...(search && {
        OR: [
          { title: { contains: search } },
          { excerpt: { contains: search } },
        ],
      }),
    };

    const [total, posts] = await Promise.all([
      prisma.post.count({ where }),
      prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: { publishedAt: 'desc' },
        select: {
          id: true, title: true, slug: true, excerpt: true,
          coverImage: true, status: true, publishedAt: true,
          readingTime: true, viewCount: true,
          author: { select: { id: true, name: true, avatar: true } },
          category: { select: { id: true, name: true, slug: true } },
          tags: { select: { tag: { select: { id: true, name: true, slug: true } } } },
        },
      }),
    ]);

    res
      .set('X-Total-Count', String(total))
      .set('X-Page', String(page))
      .set('X-Per-Page', String(limit))
      .json({
        success: true,
        data: posts,
        meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
      });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/posts/:slug  (public)
export const getPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const slug = String(req.params.slug);
    const isAdmin = req.user?.role === 'ADMIN' || req.user?.role === 'EDITOR';

    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: { select: { id: true, name: true, avatar: true } },
        category: true,
        tags: { include: { tag: true } },
      },
    });

    if (!post) throw createError('Artikel tidak ditemukan.', 404);
    if (!isAdmin && post.status !== 'PUBLISHED') throw createError('Artikel tidak ditemukan.', 404);

    // Increment view count
    await prisma.post.update({ where: { id: post.id }, data: { viewCount: { increment: 1 } } });

    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/posts  (admin/editor)
export const createPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, excerpt, content, coverImage, status, categoryId, tags, readingTime } = req.body;

    let slug = slugify(title, { lower: true, strict: true });
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const post = await prisma.post.create({
      data: {
        title, slug, excerpt, content, coverImage,
        status: status || 'DRAFT',
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
        readingTime: readingTime || 0,
        authorId: req.user!.userId,
        categoryId: categoryId || null,
        ...(tags?.length && {
          tags: {
            create: tags.map((tagId: string) => ({ tagId })),
          },
        }),
      },
      include: { author: { select: { id: true, name: true } }, category: true, tags: { include: { tag: true } } },
    });

    res.status(201).json({ success: true, message: 'Artikel berhasil dibuat.', data: post });
  } catch (error) {
    next(error);
  }
};

// PUT /api/v1/posts/:id  (admin/editor)
export const updatePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { title, excerpt, content, coverImage, status, categoryId, tags, readingTime } = req.body;

    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) throw createError('Artikel tidak ditemukan.', 404);

    let slug = existing.slug;
    if (title && title !== existing.title) {
      slug = slugify(title, { lower: true, strict: true });
      const dup = await prisma.post.findFirst({ where: { slug, NOT: { id: id } } });
      if (dup) slug = `${slug}-${Date.now()}`;
    }

    const publishedAt =
      status === 'PUBLISHED' && existing.status !== 'PUBLISHED' ? new Date() : existing.publishedAt;

    // Update tags
    if (tags !== undefined) {
      await prisma.postTag.deleteMany({ where: { postId: id } });
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        title, slug, excerpt, content, coverImage, status, publishedAt, readingTime,
        categoryId: categoryId !== undefined ? categoryId : existing.categoryId,
        ...(tags !== undefined && {
          tags: { create: tags.map((tagId: string) => ({ tagId })) },
        }),
      },
      include: { author: { select: { id: true, name: true } }, category: true, tags: { include: { tag: true } } },
    });

    res.json({ success: true, message: 'Artikel berhasil diperbarui.', data: post });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/posts/:id  (admin)
export const deletePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = String(req.params.id);
    await prisma.post.findUniqueOrThrow({ where: { id } }).catch(() => {
      throw createError('Artikel tidak ditemukan.', 404);
    });
    await prisma.post.delete({ where: { id } });
    res.json({ success: true, message: 'Artikel berhasil dihapus.' });
  } catch (error) {
    next(error);
  }
};
