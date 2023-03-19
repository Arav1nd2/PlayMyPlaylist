import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

export default function validationErrorHandler(): ErrorRequestHandler {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (err, _req, res, _next) => {
        if (err instanceof ZodError) {
            return res.status(400).json({
                error: 'ValidationError',
                errorDetail: err.issues,
            });
        }
        return res.status(500).json({
            error: 'InternalServerError',
            trace: err,
        });
    };
}
