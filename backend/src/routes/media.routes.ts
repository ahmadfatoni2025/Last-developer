import { Router } from 'express';
import { uploadMedia, getMediaList, updateMedia, deleteMedia } from '../controllers/media.controller';
import { authenticate, requireEditor } from '../middlewares/auth.middleware';
import { upload } from '../config/multer';

const router = Router();

router.use(authenticate, requireEditor);

router.get('/', getMediaList);
router.post('/upload', upload.single('file'), uploadMedia);
router.patch('/:id', updateMedia);
router.delete('/:id', deleteMedia);

export default router;
