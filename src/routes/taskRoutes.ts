import express from 'express';
import {
  createTask,
  getTaskById,
  getTasksByListId,
  updateTask,
  removeTask,
} from '../controller/taskController';

const router = express.Router();

router.post('/', createTask);
router.get('/:id', getTaskById);
router.get('/list/:listId', getTasksByListId);
router.put('/:id', updateTask);
router.delete('/:id', removeTask);
export default router;
