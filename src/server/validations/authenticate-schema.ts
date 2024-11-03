import { object, string, TypeOf } from 'zod';

export const AuthenticateSchema = object({
	username: string().min(4),
	password: string().min(4),
});

export const RegisterSchema = object({
	username: string().min(3, 'usernameMin').max(30, 'usernameMax'),
	email: string().max(50, 'emailMax').email('emailInvalid'),
	password: string().min(6, 'passwordMin').max(30, 'passwordMax'),
	passwordConfirm: string().min(6, 'passwordConfirmMin').max(30, 'passwordConfirmMax'),
}).refine(data => data.password === data.passwordConfirm, {
	path: ['passwordConfirm'],
	message: 'password.notMatch',
});

export type AuthenticateType = TypeOf<typeof AuthenticateSchema>;
