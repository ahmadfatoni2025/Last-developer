import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import prisma from '../prisma/client';
import { createError } from '../middlewares/errorHandler';

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
};

function generateTokens(userId: string, role: string, email: string) {
  const accessOpts: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as SignOptions['expiresIn'],
  };
  const refreshOpts: SignOptions = {
    expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '30d') as SignOptions['expiresIn'],
  };

  const accessToken = jwt.sign(
    { userId, role, email },
    process.env.JWT_SECRET as string,
    accessOpts
  );
  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET as string,
    refreshOpts
  );
  return { accessToken, refreshToken };
}

// POST /api/v1/auth/register
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw createError('Email sudah digunakan.', 400);

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email, password: hashed, role: 'EDITOR' },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    res.status(201).json({ success: true, message: 'Registrasi berhasil.', data: user });
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/auth/login
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.isActive) throw createError('Email atau password salah.', 401);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw createError('Email atau password salah.', 401);

    const { accessToken, refreshToken } = generateTokens(user.id, user.role, user.email);

    // Save refresh token
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: await bcrypt.hash(refreshToken, 8) },
    });

    res
      .cookie('accessToken', accessToken, { ...COOKIE_OPTS, maxAge: 7 * 24 * 60 * 60 * 1000 })
      .cookie('refreshToken', refreshToken, { ...COOKIE_OPTS, maxAge: 30 * 24 * 60 * 60 * 1000 })
      .json({
        success: true,
        message: 'Login berhasil.',
        data: {
          user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
          accessToken,
        },
      });
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/auth/refresh
export const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.cookies?.refreshToken || req.body.refreshToken;
    if (!token) throw createError('Refresh token tidak ditemukan.', 401);

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as { userId: string };
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user || !user.refreshToken) throw createError('Session tidak valid.', 401);

    const valid = await bcrypt.compare(token, user.refreshToken);
    if (!valid) throw createError('Refresh token tidak valid.', 401);

    const { accessToken, refreshToken: newRefresh } = generateTokens(user.id, user.role, user.email);
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: await bcrypt.hash(newRefresh, 8) },
    });

    res
      .cookie('accessToken', accessToken, { ...COOKIE_OPTS, maxAge: 7 * 24 * 60 * 60 * 1000 })
      .cookie('refreshToken', newRefresh, { ...COOKIE_OPTS, maxAge: 30 * 24 * 60 * 60 * 1000 })
      .json({ success: true, data: { accessToken } });
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/auth/logout
export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.user) {
      await prisma.user.update({
        where: { id: req.user.userId },
        data: { refreshToken: null },
      });
    }
    res
      .clearCookie('accessToken')
      .clearCookie('refreshToken')
      .json({ success: true, message: 'Logout berhasil.' });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/auth/me
export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      select: { id: true, name: true, email: true, role: true, avatar: true, createdAt: true },
    });
    if (!user) throw createError('User tidak ditemukan.', 404);
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/v1/auth/change-password
export const changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await prisma.user.findUnique({ where: { id: req.user!.userId } });
    if (!user) throw createError('User tidak ditemukan.', 404);

    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) throw createError('Password saat ini salah.', 400);

    const hashed = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({ where: { id: user.id }, data: { password: hashed } });

    res.json({ success: true, message: 'Password berhasil diubah.' });
  } catch (error) {
    next(error);
  }
};
