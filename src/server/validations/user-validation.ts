import { boolean, object, string, z } from 'zod';

const RoleTypeSchema = z.union([z.literal('ADMIN'), z.literal('USER')]);

export const CreateUserSchema = object({
	username: string().min(3).max(30),
	email: string().max(50).email(),
	password: string().min(6).max(30),
	passwordConfirm: string().min(6).max(30),
	role: RoleTypeSchema,
}).refine(data => data.password === data.passwordConfirm, {
	path: ['passwordConfirm'],
	message: 'password.notMatch',
});

export const ChangePasswordSchema = object({
	username: string().min(3).max(30),
	password: string().min(6).max(30),
	passwordConfirm: string().min(6).max(30),
}).refine(data => data.password === data.passwordConfirm, {
	path: ['passwordConfirm'],
	message: 'password.notMatch',
});

export const UpdateUserSchema = object({
	username: string().min(3).max(30),
	email: string().max(50).email(),
	role: string().min(3).max(20),
	locked: boolean(),
}).partial();

export type CreateUser = z.infer<typeof CreateUserSchema>;
export type ChangePassword = z.infer<typeof ChangePasswordSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
