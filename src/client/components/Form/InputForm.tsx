import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';
import { useIntl } from 'react-intl';

type InputFormProps = {
	name: string;
	validationError?: ValidationError | null;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputForm = ({ name, validationError, ...otherProps }: InputFormProps) => {
	const intl = useIntl();

	return (
		<div className={clsx('form-group', validationError?.[name] && 'error')}>
			<input
				name={name}
				placeholder={intl.formatMessage({ id: name })}
				autoComplete="off"
				{...otherProps}
			/>
			<label>{intl.formatMessage({ id: name })}</label>
			{validationError?.[name] && (
				<div className="validation-error">
					{intl.formatMessage({ id: validationError[name] })}
				</div>
			)}
		</div>
	);
};
