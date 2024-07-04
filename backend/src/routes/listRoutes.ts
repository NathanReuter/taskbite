import express from 'express';
import {
  createList,
  getListById,
  updateList,
  removeList,
  getListsByBoardId,
} from '../controller/listController';

const router = express.Router();

router.post('/', createList);
router.put('/:id', updateList);
router.get('/board/:boardId', getListsByBoardId);
router.get('/:id', getListById);
router.delete('/:id', removeList);

export default router;
