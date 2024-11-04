import { AxiosError, isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useNavigate, useRouteError } from 'react-router-dom';
import { useAlertStore } from '../hooks/alert-store';
import { useAppContext } from '../providers/app-provider';
import { axiosInstance } from '../utils/axios';
import { AuthenticateSchema } from '../../validations/authenticate-schema';
import { getErrorsObject, errorMap } from '../../validations/validation-util';
import clsx from 'clsx';
import { InputForm } from '../components/Form/InputForm';

type ErrorResponse = {
	task?: string[];
	message?: string;
	formData?: any;
};

export const Component = () => {
	const intl = useIntl();

	const [validationError, setValidationError] = useState<ValidationError | null>(null);

	const navigate = useNavigate();

	const { setLogggedUser } = useAppContext();

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

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const payload = Object.fromEntries(formData.entries());
		const validation = AuthenticateSchema.safeParse(payload, { errorMap });

		if (validation.success) {
			const { data } = await axiosInstance.post<LoggedUser>(`/api/token`, payload);
			setLogggedUser(data);
			navigate('/', { replace: true });
		} else {
			console.log(validation.error);
			setValidationError(getErrorsObject(validation.error));
		}
	};

	useEffect(() => {
		if (error) {
			alert.error(getErrorMessage(error));
		}
	}, [error]);

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
					<InputForm
						type="text"
						maxLength={20}
						name="username"
						validationError={validationError}
					/>
					<InputForm
						type="password"
						maxLength={30}
						name="password"
						validationError={validationError}
					/>
					<button type="submit" className="btn btn-primary">
						<FormattedMessage id="login" />
					</button>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							textTransform: 'uppercase',
						}}
					>
						<Link to="/register">
							<FormattedMessage id="register" />
						</Link>
						<Link to="/forgotpassword">
							<FormattedMessage id="forgotPassword" />
						</Link>
					</div>
				</form>
			</div>
		</>
	);
};

export const ErrorBoundary = () => {
	return <Component />;
};

Component.displayName = 'LoginRoute';
ErrorBoundary.displayName = 'LoginBoundary';
