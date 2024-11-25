import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthenticateSchema } from '../../validations/authenticate-schema';
import { getErrorsObject } from '../../validations/validation-util';
import { Button } from '../components/Button/Button';
import { InputForm } from '../components/Form/InputForm';
import { useAppContext } from '../providers/AppProvider';
import { axiosInstance } from '../utils/axios';
import { getLoggedUser } from '../utils/cookie-util';

export const Component = () => {
	const intl = useIntl();

	const navigate = useNavigate();

	const [validationError, setValidationError] = useState<ValidationError | null>(null);

	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const { login } = useAppContext();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setErrorMessage(null);
		setValidationError(null);

		const formData = new FormData(event.currentTarget);
		const payload = Object.fromEntries(formData.entries());
		const validation = AuthenticateSchema.safeParse(payload);

		if (validation.success) {
			try {
				const { data } = await axiosInstance.post<LoggedUser>(`/api/token`, payload);
				login(data);
			} catch (error: any) {
				if (error.response.data) {
					setErrorMessage(intl.formatMessage({ id: error.response.data.message }));
				} else {
					setErrorMessage(error.message);
				}
			}
		} else {
			setValidationError(getErrorsObject(validation.error));
		}
	};

	if (getLoggedUser()) {
		return <Navigate replace to="/" />;
	}

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

					<Button type="submit" variant="primary" size="big">
						<FormattedMessage id="login" />
					</Button>

					<div className="flex justify-between uppercase">
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

Component.displayName = 'LoginPage';
ErrorBoundary.displayName = 'LoginErrorBoundary';
