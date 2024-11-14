import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthenticateSchema } from '../../validations/authenticate-schema';
import { getErrorsObject } from '../../validations/validation-util';
import { InputForm } from '../components/Form/InputForm';
import { useAppContext } from '../providers/app-provider';
import { axiosInstance } from '../utils/axios';
import { Button } from '../components/Button/Button';

export const Component = () => {
	const intl = useIntl();

	const [validationError, setValidationError] = useState<ValidationError | null>(null);

	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const navigate = useNavigate();

	const location = useLocation();

	const from = location.state?.from?.pathname || '/';

	const { setLoggedUser } = useAppContext();

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
				setLoggedUser(data);
				navigate(from, { replace: true });
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

					<div className="links">
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
