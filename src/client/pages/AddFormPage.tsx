import { FormattedMessage, useIntl } from 'react-intl';
import { ActionFunctionArgs, Form, isRouteErrorResponse, Link, redirect, useActionData, useRouteError } from 'react-router-dom';
import { axiosInstance } from '../utils/axios';

export interface ErrorValidation {
	code: string
	minimum: number
	type: string
	inclusive: boolean
	exact: boolean
	message: string
	path: string[]
}

export const Component = () => {

	const intl = useIntl();

	const error = useRouteError();

	const data = useActionData();

	console.error(error);

	console.error(data);

	return (
		<>
			<Form
				action='/add'
				method='post'
				noValidate
				autoComplete='off'
				className="todo-form">

				<div className="form-group">
					<label><FormattedMessage id="task" /></label>
					<input
						type="text"
						placeholder={intl.formatMessage({ id: 'task' })}
						name='task'
						autoComplete='off'
						autoFocus />
				</div>
				<section className="buttons">
					<Link to={"/"} className="btn btn-secondary">
						<FormattedMessage id="back" />
					</Link>
					<button type="submit" className="btn btn-primary">
						<FormattedMessage id="save" />
					</button>
				</section>

			</Form>
		</>
	)
}



export const ErrorBoundary = () => {
	return <Component/>
}



export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const payload = Object.fromEntries(formData.entries());
	await axiosInstance.post<Todo>(`/api/todoes`, payload)

	return redirect("/");
};

Component.displayName = "TodoAddRoute";
ErrorBoundary.displayName = "TodoAddBoundary";