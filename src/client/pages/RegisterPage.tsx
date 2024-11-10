import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { RegisterSchema } from '../../validations/authenticate-schema';
import { getErrorsObject } from '../../validations/validation-util';
import { InputForm } from '../components/Form/InputForm';
import { axiosInstance } from '../utils/axios';
import { useToastContext } from '../providers/toast-provider';
import { Button } from '../components/Button/Button';


export const Component = () => {
	const intl = useIntl();

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
		const validation = RegisterSchema.safeParse(payload);

		if (validation.success) {
			try {
				const arg = validation.data.username;
				await axiosInstance.post(`/api/register`, validation.data);
				toast(intl.formatMessage({ "id": "dataIsSaved" }, { arg }));
				form.reset();
			} catch (error: any) {
				if (error.response?.data) {
					setErrorMessage(intl.formatMessage({ "id": error.response.data.message }));
				} else {
					setErrorMessage(error.message)
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
					className="form">

					{errorMessage && <p>{errorMessage}</p>}

					<InputForm
						type="text"
						maxLength={50}
						name="email"
						validationError={validationError} />

					<InputForm
						type="text"
						maxLength={20}
						name="username"
						validationError={validationError} />

					<InputForm
						type="password"
						maxLength={30}
						name="password"
						validationError={validationError} />

					<InputForm
						type="password"
						maxLength={30}
						name="passwordConfirm"
						validationError={validationError} />

					<Button type="submit" variant='primary' size='big'>
						<FormattedMessage id="register" />
					</Button>

					<div className='links'>
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

Component.displayName = 'RegisterPage';
ErrorBoundary.displayName = 'RegisterErrorBoundary';
