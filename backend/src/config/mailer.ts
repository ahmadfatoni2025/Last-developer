import nodemailer from 'nodemailer';
import { logger } from '../utils/logger';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export interface MailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

export async function sendMail(options: MailOptions): Promise<void> {
  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM || 'lazDev <noreply@lazdev.com>',
      ...options,
    });
    logger.info(`📧 Email sent to: ${options.to}`);
  } catch (error) {
    logger.error('Failed to send email:', error);
    throw error;
  }
}

export function contactReplyTemplate(name: string, message: string): string {
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;">
      <h2 style="color:#1a1a2e;">Terima kasih, ${name}!</h2>
      <p>Kami telah menerima pesan Anda:</p>
      <blockquote style="border-left:4px solid #6366f1;padding:12px;background:#f5f3ff;border-radius:4px;">
        ${message}
      </blockquote>
      <p>Tim lazDev akan menghubungi Anda segera. 🚀</p>
      <hr/>
      <small style="color:#888;">© ${new Date().getFullYear()} lazDev — Laizs</small>
    </div>
  `;
}

export function newsletterWelcomeTemplate(email: string, token: string): string {
  const unsubUrl = `${process.env.ALLOWED_ORIGINS?.split(',')[0] || 'http://localhost:5173'}/unsubscribe?token=${token}`;
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;">
      <h2 style="color:#1a1a2e;">Selamat datang di newsletter lazDev! 🎉</h2>
      <p>Email <strong>${email}</strong> berhasil didaftarkan.</p>
      <p>Anda akan mendapat update terbaru seputar teknologi & produk kami.</p>
      <p>Jika ingin berhenti berlangganan: <a href="${unsubUrl}">klik di sini</a></p>
      <hr/>
      <small style="color:#888;">© ${new Date().getFullYear()} lazDev — Laizs</small>
    </div>
  `;
}

export default transporter;
