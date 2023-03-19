import { z } from 'zod';

export const createUserSchema = z.object({
    username: z.string().min(3).max(20),
    avatarUrl: z.string().max(500),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;

export const createUserValidator = (payload: unknown) =>
    createUserSchema.parseAsync(payload);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const buildCreateUserDTO = (body: any): CreateUserDTO => {
    return {
        username: body.username,
        avatarUrl: body.avatarUrl,
    };
};
