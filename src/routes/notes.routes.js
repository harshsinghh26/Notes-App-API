import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middlewares.js';
import {
  createNotes,
  getNotes,
  getNotesById,
} from '../controller/notes.controller.js';

const router = Router();

router.route('/createnotes').post(verifyJWT, createNotes);
router.route('/getnotes').get(verifyJWT, getNotes);
router.route('/getnotesbyid/:id').get(verifyJWT, getNotesById);

export default router;
