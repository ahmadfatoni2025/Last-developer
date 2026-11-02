import { Router } from 'express';
import { body } from 'express-validator';
import {
  subscribe, unsubscribe, getSubscribers, deleteSubscriber,
} from '../controllers/newsletter.controller';
import { authenticate, requireAdmin } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { newsletterLimiter } from '../config/rateLimit';

const router = Router();

router.post(
  '/subscribe',
  newsletterLimiter,
  [body('email').isEmail().normalizeEmail().withMessage('Email tidak valid')],
  validate,
  subscribe
);

router.get('/unsubscribe', unsubscribe);

router.get('/', authenticate, requireAdmin, getSubscribers);
router.delete('/:id', authenticate, requireAdmin, deleteSubscriber);

export default router;
