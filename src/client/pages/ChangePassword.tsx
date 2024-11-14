import { FormattedMessage, useIntl } from 'react-intl';
import { SimpleErrorBoundary } from '../components/SimpleErrorBoundary';
import { useToastContext } from '../providers/toast-provider';
import { useState } from 'react';
import { ChangePasswordSchema } from '../../validations/user-validation';
import { axiosInstance } from '../utils/axios';
import { getErrorsObject } from '../../validations/validation-util';
import { InputForm } from '../components/Form/InputForm';
import { Button } from '../components/Button/Button';
import { getLoggedUser } from '../utils/cookie-util';

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
		const validation = ChangePasswordSchema.safeParse(payload);

		if (validation.success) {
			try {
				const arg = validation.data.username;
				await axiosInstance.post(`/api/users`, validation.data);
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
						maxLength={20}
						name="username"
						value={getLoggedUser()?.username}
						readOnly
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
				</form>
			</div>
		</>
	);
};

export function ErrorBoundary() {
	return <SimpleErrorBoundary />;
}

Component.displayName = 'ChangePasswordRoute';
ErrorBoundary.displayName = 'ChangePasswordErrorBoundary';
