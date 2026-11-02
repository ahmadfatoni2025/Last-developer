import { Router } from 'express';
import { body } from 'express-validator';
import { getTags, createTag, deleteTag } from '../controllers/category.controller';
import { authenticate, requireEditor, requireAdmin } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';

const router = Router();

router.get('/', getTags);

router.post(
  '/',
  authenticate,
  requireEditor,
  [body('name').trim().notEmpty().withMessage('Nama tag wajib diisi')],
  validate,
  createTag
);

router.delete('/:id', authenticate, requireAdmin, deleteTag);

export default router;
