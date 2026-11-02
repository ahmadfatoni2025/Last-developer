import { Router } from 'express';
import { body } from 'express-validator';
import { getPosts, getPost, createPost, updatePost, deletePost } from '../controllers/post.controller';
import { authenticate, requireEditor, requireAdmin } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';

const router = Router();

// Public
router.get('/', getPosts);
router.get('/:slug', getPost);

// Protected
router.post(
  '/',
  authenticate,
  requireEditor,
  [
    body('title').trim().notEmpty().withMessage('Judul wajib diisi'),
    body('content').notEmpty().withMessage('Konten wajib diisi'),
  ],
  validate,
  createPost
);

router.put(
  '/:id',
  authenticate,
  requireEditor,
  [body('title').optional().trim().notEmpty()],
  validate,
  updatePost
);

router.delete('/:id', authenticate, requireAdmin, deletePost);

export default router;
