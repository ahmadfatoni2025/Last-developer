import { Router } from 'express';
import { body } from 'express-validator';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../controllers/category.controller';
import { authenticate, requireEditor, requireAdmin } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';

const router = Router();

router.get('/', getCategories);

router.post(
  '/',
  authenticate,
  requireEditor,
  [body('name').trim().notEmpty().withMessage('Nama kategori wajib diisi')],
  validate,
  createCategory
);

router.put(
  '/:id',
  authenticate,
  requireEditor,
  [body('name').trim().notEmpty()],
  validate,
  updateCategory
);

router.delete('/:id', authenticate, requireAdmin, deleteCategory);

export default router;
