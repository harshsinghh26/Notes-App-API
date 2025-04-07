import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middlewares.js';
import {
  createNotes,
  getNotes,
  getNotesById,
  updateNotes,
} from '../controller/notes.controller.js';

const router = Router();

router.route('/createnotes').post(verifyJWT, createNotes);
router.route('/getnotes').get(verifyJWT, getNotes);
router.route('/getnotesbyid/:id').get(verifyJWT, getNotesById);
router.route('/update/:id').put(verifyJWT, updateNotes);

export default router;
