import { Router } from 'express';
import { body } from 'express-validator';
import {
  getProjects, getProject, createProject, updateProject, deleteProject, reorderProjects,
} from '../controllers/project.controller';
import { authenticate, requireEditor, requireAdmin } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';

const router = Router();

router.get('/', getProjects);
router.get('/:slug', getProject);

router.post(
  '/',
  authenticate,
  requireEditor,
  [
    body('title').trim().notEmpty().withMessage('Judul wajib diisi'),
    body('description').notEmpty().withMessage('Deskripsi wajib diisi'),
  ],
  validate,
  createProject
);

router.put('/:id', authenticate, requireEditor, updateProject);
router.delete('/:id', authenticate, requireAdmin, deleteProject);
router.patch('/reorder', authenticate, requireAdmin, reorderProjects);

export default router;
