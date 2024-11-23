import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';
import { ResetPasswordSchema } from '../../validations/authenticate-schema';
import { getErrorsObject } from '../../validations/validation-util';
import { Button } from '../components/Button/Button';
import { InputForm } from '../components/Form/InputForm';
import { SimpleErrorBoundary } from '../components/SimpleErrorBoundary';
import { useToastContext } from '../providers/ToastProvider';
import { axiosInstance } from '../utils/axios';

export const Component = () => {
	const intl = useIntl();

	const location = useLocation();

	const { toast } = useToastContext();

	const [validationError, setValidationError] = useState<ValidationError | null>(null);

	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const getToken = () => {
		const params = new URLSearchParams(decodeURIComponent(location.search));
		return params.get('token') || intl.formatMessage({ id: 'invalid.token' });
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setErrorMessage(null);
		setValidationError(null);

		const form = event.currentTarget;
		const formData = new FormData(form);
		const payload = Object.fromEntries(formData.entries());
		const validation = ResetPasswordSchema.safeParse(payload);

		if (validation.success) {
			try {
				const { data } = await axiosInstance.post<KeyValue>(
					`/api/resetpassword`,
					validation.data
				);
				toast(intl.formatMessage({ id: 'dataIsSaved' }, { arg: data.username }));
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
						name="token"
						value={getToken()}
						readOnly
						validationError={validationError}
					/>

					<InputForm
						type="password"
						maxLength={30}
						name="password"
						validationError={validationError}
					/>

					<InputForm
						type="password"
						maxLength={30}
						name="passwordConfirm"
						validationError={validationError}
					/>

					<Button type="submit" variant="primary" size="big">
						<FormattedMessage id="changePassword" />
					</Button>

					<div className="links">
						<Link to="/login">
							<FormattedMessage id="login" />
						</Link>
					</div>
				</form>
			</div>
		</>
	);
};

export function ErrorBoundary() {
	return <SimpleErrorBoundary />;
}

Component.displayName = 'ResetPasswordRoute';
ErrorBoundary.displayName = 'ResetPasswordErrorBoundary';
