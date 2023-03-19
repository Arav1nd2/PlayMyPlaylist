import { NextFunction, Request, Response, Router } from 'express';
import {
    buildCreateUserDTO,
    createUserValidator,
} from '../helpers/users.helper';
import { logger } from '../services/logger';

const router = Router();

router.post(
    '/user',
    async (req: Request, response: Response, next: NextFunction) => {
        try {
            logger.debug(req.body);
            await createUserValidator(req.body);
            const userDTO = buildCreateUserDTO(req.body);
            response.status(201).json({
                user_id: 'asdbxi',
                userDTO,
            });
        } catch (err) {
            logger.debug('Reached error');
            next(err);
        }
    },
);

export default router;
