import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { ChangePasswordSchema } from '../../../validations/user-validation';
import { getErrorsObject } from '../../../validations/validation-util';
import { useToastContext } from '../../providers/ToastProvider';
import { axiosInstance } from '../../utils/axios';
import { getLoggedUser } from '../../utils/cookie-util';
import { Button } from '../Button/Button';
import { InputForm } from '../Form/InputForm';

type UserFormProps = {
	response?: AxiosResponse<Omit<User, 'password'>>;
};

export const UserPasswordForm = ({ response }: UserFormProps) => {
	const intl = useIntl();

	const navigate = useNavigate();

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
				await axiosInstance.post(`/api/users/password`, validation.data);
				toast(intl.formatMessage({ id: 'dataIsSaved' }, { arg }));
				form.reset();

				if (response) {
					navigate('/user', { replace: true });
				}
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
						value={response?.data.username || getLoggedUser()?.username}
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

					{!response && (
						<Button type="submit" variant="primary" size="big">
							<FormattedMessage id="update" />
						</Button>
					)}
					{response && (
						<div className="form-buttons">
							<Button
								type="button"
								size="big"
								onClick={() => navigate('/user', { replace: true })}
							>
								<FormattedMessage id="back" />
							</Button>

							<Button type="submit" variant="primary" size="big">
								<FormattedMessage id="update" />
							</Button>
						</div>
					)}
				</form>
			</div>
		</>
	);
};
