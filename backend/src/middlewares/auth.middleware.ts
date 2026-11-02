import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client';

export interface JwtPayload {
  userId: string;
  role: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : req.cookies?.accessToken;

    if (!token) {
      res.status(401).json({ success: false, message: 'Akses ditolak. Token tidak ditemukan.' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    // Check user still active
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, isActive: true, role: true, email: true },
    });

    if (!user || !user.isActive) {
      res.status(401).json({ success: false, message: 'Akun tidak aktif atau tidak ditemukan.' });
      return;
    }

    req.user = { userId: user.id, role: user.role, email: user.email };
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ success: false, message: 'Token kadaluarsa.' });
      return;
    }
    res.status(401).json({ success: false, message: 'Token tidak valid.' });
  }
};

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.role !== 'ADMIN') {
    res.status(403).json({ success: false, message: 'Akses ditolak. Hak akses admin diperlukan.' });
    return;
  }
  next();
};

export const requireEditor = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!['ADMIN', 'EDITOR'].includes(req.user?.role || '')) {
    res.status(403).json({ success: false, message: 'Akses ditolak.' });
    return;
  }
  next();
};
