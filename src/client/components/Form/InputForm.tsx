import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';
import { useIntl } from 'react-intl';
import styles from './InputForm.module.css';

type InputFormProps = {
	name: string;
	validationError?: ValidationError | null;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputForm = ({ name, validationError, ...otherProps }: InputFormProps) => {
	const intl = useIntl();

	return (
		<div className={styles['form-group']}>
			<input
				name={name}
				placeholder={intl.formatMessage({ id: name })}
				autoComplete="off"
				{...otherProps}
			/>
			<label>{intl.formatMessage({ id: name })}</label>
			{validationError?.[name] && <p>{intl.formatMessage({ id: validationError[name] })}</p>}
		</div>
	);
};
