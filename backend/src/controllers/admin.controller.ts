import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/client';
import { createError } from '../middlewares/errorHandler';

// GET /api/v1/admin/dashboard
export const getDashboardStats = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [
      totalPosts,
      publishedPosts,
      totalProjects,
      totalContacts,
      unreadContacts,
      totalSubscribers,
      activeSubscribers,
      totalMedia,
      recentPosts,
      recentContacts,
    ] = await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { status: 'PUBLISHED' } }),
      prisma.project.count({ where: { status: 'PUBLISHED' } }),
      prisma.contact.count(),
      prisma.contact.count({ where: { status: 'UNREAD' } }),
      prisma.subscriber.count(),
      prisma.subscriber.count({ where: { isActive: true } }),
      prisma.media.count(),
      prisma.post.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, title: true, slug: true, status: true, createdAt: true },
      }),
      prisma.contact.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, email: true, subject: true, status: true, createdAt: true },
      }),
    ]);

    res.json({
      success: true,
      data: {
        stats: {
          posts: { total: totalPosts, published: publishedPosts },
          projects: { total: totalProjects },
          contacts: { total: totalContacts, unread: unreadContacts },
          subscribers: { total: totalSubscribers, active: activeSubscribers },
          media: { total: totalMedia },
        },
        recentPosts,
        recentContacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/admin/users
export const getUsers = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, isActive: true, avatar: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/v1/admin/users/:id
export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { name, role, isActive } = req.body;

    if (id === req.user!.userId) throw createError('Tidak dapat mengubah akun sendiri dari sini.', 400);

    const user = await prisma.user.update({
      where: { id },
      data: { name, role, isActive },
      select: { id: true, name: true, email: true, role: true, isActive: true },
    });

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/admin/users/:id
export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = String(req.params.id);
    if (id === req.user!.userId) throw createError('Tidak dapat menghapus akun sendiri.', 400);
    await prisma.user.delete({ where: { id } });
    res.json({ success: true, message: 'User dihapus.' });
  } catch (error) {
    next(error);
  }
};
