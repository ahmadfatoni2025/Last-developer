import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../prisma/client';
import { createError } from '../middlewares/errorHandler';
import { sendMail, newsletterWelcomeTemplate } from '../config/mailer';

// POST /api/v1/newsletter/subscribe  (public)
export const subscribe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, name } = req.body;

    const existing = await prisma.subscriber.findUnique({ where: { email } });

    if (existing) {
      if (existing.isActive) {
        res.json({ success: true, message: 'Email ini sudah terdaftar di newsletter kami.' });
        return;
      }
      // Re-activate
      await prisma.subscriber.update({
        where: { email },
        data: { isActive: true, unsubscribedAt: null, name },
      });
      res.json({ success: true, message: 'Langganan newsletter Anda telah diaktifkan kembali.' });
      return;
    }

    const token = uuidv4();
    await prisma.subscriber.create({ data: { email, name, token } });

    try {
      await sendMail({
        to: email,
        subject: 'Selamat datang di newsletter lazDev! 🚀',
        html: newsletterWelcomeTemplate(email, token),
      });
    } catch {
      // non-blocking
    }

    res.status(201).json({ success: true, message: 'Berhasil subscribe! Cek inbox email Anda.' });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/newsletter/unsubscribe?token=xxx  (public)
export const unsubscribe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token } = req.query as { token: string };
    if (!token) throw createError('Token tidak valid.', 400);

    const sub = await prisma.subscriber.findFirst({ where: { token } });
    if (!sub) throw createError('Token tidak ditemukan.', 404);

    await prisma.subscriber.update({
      where: { id: sub.id },
      data: { isActive: false, unsubscribedAt: new Date() },
    });

    res.json({ success: true, message: 'Anda telah berhasil berhenti berlangganan.' });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/newsletter  (admin)
export const getSubscribers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Number(req.query.limit) || 20);
    const skip = (page - 1) * limit;
    const isActive = req.query.active !== 'false';

    const where = { isActive };
    const [total, subscribers] = await Promise.all([
      prisma.subscriber.count({ where }),
      prisma.subscriber.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
    ]);

    res.json({ success: true, data: subscribers, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/newsletter/:id  (admin)
export const deleteSubscriber = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = String(req.params.id);
    await prisma.subscriber.delete({ where: { id } });
    res.json({ success: true, message: 'Subscriber dihapus.' });
  } catch (error) {
    next(error);
  }
};
