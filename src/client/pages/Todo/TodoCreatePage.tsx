import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { ActionFunctionArgs, Link, redirect, useNavigate } from 'react-router-dom';
import { InputForm } from '../../../client/components/Form/InputForm';
import { CreateTodoSchema } from '../../../validations/todo-validation';
import { getErrorsObject } from '../../../validations/validation-util';
import { useToastContext } from '../../providers/ToastProvider';
import { axiosInstance } from '../../utils/axios';
import { Button } from '../../../client/components/Button/Button';

export const Component = () => {
	const intl = useIntl();

	const navigate = useNavigate();

	const { toast } = useToastContext();

	const [validationError, setValidationError] = useState<ValidationError | null>(null);

	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setErrorMessage(null);
		setValidationError(null);

		const form = event.currentTarget;
		const formData = new FormData(form);
		const payload = Object.fromEntries(formData.entries());
		const validation = CreateTodoSchema.safeParse(payload);

		if (validation.success) {
			try {
				const arg = validation.data.task;
				await axiosInstance.post(`/api/todoes`, validation.data);
				toast(intl.formatMessage({ id: 'dataIsSaved' }, { arg }));
				form.reset();
			} catch (error: any) {
				console.log(error);
				if (error.response?.data) {
					setErrorMessage(intl.formatMessage({ id: error.response.data.message }));
				} else {
					setErrorMessage(error.message);
				}
			}
		} else {
			setValidationError(getErrorsObject(validation.error));
		}
	};

	return (
		<>
			<div className="container-center">
				<form
					onSubmit={handleSubmit}
					method="post"
					noValidate
					autoComplete="off"
					className="form"
				>
					{errorMessage && <p>{errorMessage}</p>}

					<InputForm
						type="text"
						maxLength={50}
						name="task"
						validationError={validationError}
					/>

					<div className="flex gap-1 mt-3">
						<Button className="grow" size="big" onClick={() => navigate('/todo')}>
							<FormattedMessage id="back" />
						</Button>
						<Button className="grow" type="submit" variant="primary" size="big">
							<FormattedMessage id="create" />
						</Button>
					</div>
				</form>
			</div>
		</>
	);
};

export const ErrorBoundary = () => {
	return <Component />;
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const payload = Object.fromEntries(formData.entries());
	await axiosInstance.post<Todo>(`/api/todoes`, payload);

	return redirect('/todo');
};

Component.displayName = 'TodoCreateRoute';
ErrorBoundary.displayName = 'TodoCreateBoundary';
