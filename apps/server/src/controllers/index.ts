import { Router } from 'express';
import UserController from './users.controller';

const router = Router();

router.use(UserController);

export default router;
