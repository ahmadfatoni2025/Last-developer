import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/client';
import { createError } from '../middlewares/errorHandler';
import { sendMail, contactReplyTemplate } from '../config/mailer';

// POST /api/v1/contact  (public)
export const sendContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, subject, message, phone } = req.body;

    const contact = await prisma.contact.create({
      data: {
        name, email, subject, message, phone,
        ipAddress: req.ip || req.socket.remoteAddress,
      },
    });

    // Send auto-reply to sender
    try {
      await sendMail({
        to: email,
        subject: `Pesan Anda telah kami terima — lazDev`,
        html: contactReplyTemplate(name, message),
      });
    } catch {
      // don't fail the request if email fails
    }

    // Notify admin
    try {
      await sendMail({
        to: process.env.SMTP_USER as string,
        subject: `[Contact] ${subject || 'Pesan baru'} dari ${name}`,
        html: `<p><strong>Dari:</strong> ${name} &lt;${email}&gt;</p><p><strong>Phone:</strong> ${phone || '-'}</p><p>${message}</p>`,
      });
    } catch {
      // non-blocking
    }

    res.status(201).json({
      success: true,
      message: 'Pesan berhasil dikirim. Kami akan segera menghubungi Anda.',
      data: { id: contact.id },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/contact  (admin)
export const getContacts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Number(req.query.limit) || 20);
    const skip = (page - 1) * limit;
    const status = req.query.status as string | undefined;

    const where = status ? { status: status as 'UNREAD' | 'READ' | 'REPLIED' | 'ARCHIVED' } : {};

    const [total, contacts] = await Promise.all([
      prisma.contact.count({ where }),
      prisma.contact.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
    ]);

    res.json({ success: true, data: contacts, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/contact/:id  (admin)
export const getContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = String(req.params.id);
    const contact = await prisma.contact.findUnique({ where: { id } });
    if (!contact) throw createError('Pesan tidak ditemukan.', 404);

    // Mark as read
    if (contact.status === 'UNREAD') {
      await prisma.contact.update({ where: { id }, data: { status: 'READ' } });
    }

    res.json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/v1/contact/:id/status  (admin)
export const updateContactStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { status } = req.body;

    const contact = await prisma.contact.update({ where: { id }, data: { status } });
    res.json({ success: true, message: 'Status diperbarui.', data: contact });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/contact/:id  (admin)
export const deleteContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = String(req.params.id);
    await prisma.contact.delete({ where: { id } });
    res.json({ success: true, message: 'Pesan dihapus.' });
  } catch (error) {
    next(error);
  }
};
