import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middlewares.js';
import { createNotes } from '../controller/notes.controller.js';

const router = Router();

router.route('/createnotes').post(verifyJWT, createNotes);

export default router;
