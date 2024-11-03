import { AxiosError, isAxiosError } from 'axios';
import { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Form, Link, useRouteError } from 'react-router-dom';
import { useAlertStore } from '../hooks/alert-store';
import { axiosInstance } from '../utils/axios';

type ErrorResponse = {
	task?: string[];
	message?: string;
	formData?: any;
};

export const Component = () => {
	const intl = useIntl();

	const { alert } = useAlertStore();

	const error = useRouteError();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const payload = Object.fromEntries(formData.entries());
		const { data } = await axiosInstance.post(`/api/register`, payload);
		console.log(data);
	};

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
			<div className="container-center">
				<Form
					onSubmit={handleSubmit}
					method="post"
					noValidate
					autoComplete="off"
					className="form"
				>
					<div className="form-group">
						<label>
							<FormattedMessage id="email" />
						</label>
						<input
							type="text"
							maxLength={50}
							placeholder={intl.formatMessage({ id: 'email' })}
							name="email"
							autoComplete="off"
							autoFocus
						/>
					</div>
					<div className="form-group">
						<label>
							<FormattedMessage id="username" />
						</label>
						<input
							maxLength={30}
							type="text"
							placeholder={intl.formatMessage({ id: 'username' })}
							name="username"
							autoComplete="off"
						/>
					</div>
					<div className="form-group">
						<label>
							<FormattedMessage id="password" />
						</label>
						<input
							maxLength={30}
							type="password"
							placeholder={intl.formatMessage({ id: 'password' })}
							name="password"
							autoComplete="off"
						/>
					</div>
					<div className="form-group">
						<label>
							<FormattedMessage id="passwordConfirm" />
						</label>
						<input
							maxLength={30}
							type="password"
							placeholder={intl.formatMessage({ id: 'passwordConfirm' })}
							name="passwordConfirm"
							autoComplete="off"
						/>
					</div>
					<button
						type="submit"
						className="btn btn-primary"
						style={{ display: 'block', fontSize: '1.2rem' }}
					>
						<FormattedMessage id="register" />
					</button>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Link to="/login">
							<FormattedMessage id="login" />
						</Link>
					</div>
				</Form>
			</div>
		</>
	);
};

export const ErrorBoundary = () => {
	return <Component />;
};

Component.displayName = 'RegisterRoute';
ErrorBoundary.displayName = 'RegisterErrorBoundary';
