import { FC, ChangeEventHandler, useState } from 'react';
import './FloatFormGroup.css';

type FloatFormProps = {
	inputText: string;
	handleChange?: ChangeEventHandler<HTMLInputElement>;
	labelText: string;
	type: 'text' | 'password';
	id: string;
};

const FloatFormGroup: FC<FloatFormProps & { [prop: string]: any }> = ({
	inputText,
	handleChange,
	labelText,
	type,
	id,
	...otherProps
}) => {
	const [active, setActive] = useState(false);

	//it is a way for fucsing to the inputs with ref system
	// const ref = createRef<HTMLInputElement>();
	// useEffect(() => {
	//   if ("autoFocus" in otherProps) ref.current!.focus();
	// }, [otherProps,ref]);

	return (
		<div className="form-group">
			<label
				htmlFor={id}
				className={`${active || inputText !== '' ? ` activeLabel` : ''} label-float`}
			>
				{labelText}
			</label>
			<input
				type={type}
				className="form-input"
				id={id}
				onFocus={() => setActive(true)}
				onBlur={() => setActive(false)}
				{...otherProps}
			/>
		</div>
	);
};

export default FloatFormGroup;
