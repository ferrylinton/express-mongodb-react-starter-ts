import { ZodError } from 'zod';

type FieldError = {
	[key: string]: string;
};
export const getErrorsObject = (error: ZodError) => {
	const { fieldErrors } = error.flatten();
	const errors: FieldError = {};

	for (const entry of Object.entries(fieldErrors)) {
		const [key, values] = entry as [string, string[] | undefined];

		if (values) {
			errors[key] = values[0];
		}
	}

	return errors;
};
