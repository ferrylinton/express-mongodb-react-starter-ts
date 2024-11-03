import { AxiosError, isAxiosError } from 'axios';
import { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { ActionFunctionArgs, Form, Link, redirect, useRouteError } from 'react-router-dom';
import { useAlertStore } from '../../hooks/alert-store';
import { axiosInstance } from '../../utils/axios';

type ErrorResponse = {
	task?: string[];
	message?: string;
	formData?: any;
};

export const Component = () => {
	const intl = useIntl();

	const { alert } = useAlertStore();

	const error = useRouteError();

	const getErrorMessage = (error: unknown) => {
		console.error(error);

		if (isAxiosError(error)) {
			const axiosError = error as AxiosError<ErrorResponse>;

			if (axiosError.response?.data.task) {
				return intl.formatMessage({ id: axiosError.response?.data.task[0] });
			} else if (axiosError.response?.data.message === 'duplicateData') {
				const arg = axiosError.response?.data.formData.task || 'unknown';
				return intl.formatMessage({ id: 'duplicateData' }, { arg });
			}
		}

		return (error as any).message;
	};

	useEffect(() => {
		if (error) {
			alert.error(getErrorMessage(error));
		}
	}, [error]);

	return (
		<>
			<Form
				action="/todo/create"
				method="post"
				noValidate
				autoComplete="off"
				className="todo-form"
			>
				<div className="form-group">
					<label>
						<FormattedMessage id="task" />
					</label>
					<input
						type="text"
						placeholder={intl.formatMessage({ id: 'task' })}
						name="task"
						autoComplete="off"
						autoFocus
					/>
				</div>
				<section className="buttons">
					<Link to={'/'} className="btn btn-secondary">
						<FormattedMessage id="back" />
					</Link>
					<button type="submit" className="btn btn-primary">
						<FormattedMessage id="save" />
					</button>
				</section>
			</Form>
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
