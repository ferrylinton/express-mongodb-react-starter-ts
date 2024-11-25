import { AxiosError, isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useRouteError } from 'react-router-dom';
import { ForgotPasswordSchema } from '../../validations/authenticate-schema';
import { getErrorsObject } from '../../validations/validation-util';
import { Button } from '../components/Button/Button';
import { InputForm } from '../components/Form/InputForm';
import { useAlertStore } from '../hooks/alert-store';
import { useToastContext } from '../providers/ToastProvider';
import { axiosInstance } from '../utils/axios';

type ErrorResponse = {
	task?: string[];
	message?: string;
	formData?: any;
};

export const Component = () => {
	const intl = useIntl();

	const { toast } = useToastContext();

	const [validationError, setValidationError] = useState<ValidationError | null>(null);

	const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

		const form = event.currentTarget;
		const formData = new FormData(form);
		const payload = Object.fromEntries(formData.entries());
		const validation = ForgotPasswordSchema.safeParse(payload);

		if (validation.success) {
			try {
				await axiosInstance.post<KeyValue>(`/api/forgotpassword`, validation.data);
				toast(intl.formatMessage({ id: 'emailSent' }));
				form.reset();
			} catch (error: any) {
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
					{errorMessage && <p>{errorMessage}</p>}

					<InputForm
						type="text"
						maxLength={50}
						name="email"
						validationError={validationError}
					/>

					<Button type="submit" variant="primary" size="big">
						<FormattedMessage id="forgotPassword" />
					</Button>

					<div className="flex justify-between uppercase">
						<Link to="/register">
							<FormattedMessage id="register" />
						</Link>
						<Link to="/login">
							<FormattedMessage id="login" />
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
