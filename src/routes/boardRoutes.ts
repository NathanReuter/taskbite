import express from 'express';
import {
  updateBoard,
  createBoard,
  getBoardById,
  removeBoard,
} from '../controller/boardController';

const router = express.Router();

router.post('/', createBoard);
router.put('/:id', updateBoard);
router.get('/:id', getBoardById);
router.delete('/:id', removeBoard);

export default router;
