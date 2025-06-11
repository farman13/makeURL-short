
import { Router } from 'express';
import { createURL, redirectURL } from '../controllers/shortUrl.controller.js';

const router = Router();

router.route('/createURL').post(createURL)
router.route('/:id').get(redirectURL)

export default router;
