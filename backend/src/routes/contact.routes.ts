import { Router } from 'express';
import { body } from 'express-validator';
import {
  sendContact, getContacts, getContact, updateContactStatus, deleteContact,
} from '../controllers/contact.controller';
import { authenticate, requireAdmin } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { contactLimiter } from '../config/rateLimit';

const router = Router();

// Public — send message
router.post(
  '/',
  contactLimiter,
  [
    body('name').trim().notEmpty().withMessage('Nama wajib diisi'),
    body('email').isEmail().normalizeEmail().withMessage('Email tidak valid'),
    body('message').trim().isLength({ min: 10 }).withMessage('Pesan minimal 10 karakter'),
  ],
  validate,
  sendContact
);

// Admin only
router.get('/', authenticate, requireAdmin, getContacts);
router.get('/:id', authenticate, requireAdmin, getContact);
router.patch('/:id/status', authenticate, requireAdmin, [
  body('status').isIn(['UNREAD', 'READ', 'REPLIED', 'ARCHIVED']).withMessage('Status tidak valid'),
], validate, updateContactStatus);
router.delete('/:id', authenticate, requireAdmin, deleteContact);

export default router;
