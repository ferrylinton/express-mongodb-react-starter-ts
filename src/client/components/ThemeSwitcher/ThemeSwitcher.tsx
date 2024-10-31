import * as Switch from '@radix-ui/react-switch';
import { useAppContext } from '../../providers/app-provider';
import './ThemeSwitcher.css';
import { useState } from 'react';

export const ThemeSwitcher = () => {
	const { setTheme, getTheme } = useAppContext();

	const [checked, setChecked] = useState(getTheme() === 'dark');

	const onCheckedChangeHandler = (value: boolean) => {
		console.log('value : ' + value);
		setChecked(value);
		setTheme(value ? 'dark' : 'light');
	};

	return (
		<div className="theme-switcher">
			<Switch.Root checked={checked} onCheckedChange={onCheckedChangeHandler}>
				<Switch.Thumb />
			</Switch.Root>
		</div>
	);
};
