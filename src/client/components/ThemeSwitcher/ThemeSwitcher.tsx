import * as Switch from '@radix-ui/react-switch';
import { useState } from 'react';
import styles from './ThemeSwitcher.module.css';

const THEME = 'theme';

const getTheme = (): Theme => {
	let theme = localStorage.getItem(THEME);

	if (!theme) {
		theme = 'light';
		localStorage.setItem(THEME, theme);
	}

	document.body.classList.add(theme);
	return theme as Theme;
};

const setTheme = (theme: Theme) => {
	localStorage.setItem(THEME, theme);

	if (theme === 'dark') {
		document.body.classList.add('dark');
		document.body.classList.remove('light');
	} else {
		document.body.classList.remove('dark');
		document.body.classList.add('light');
	}
};

export const ThemeSwitcher = () => {
	const [checked, setChecked] = useState(getTheme() === 'dark');

	const onCheckedChangeHandler = (value: boolean) => {
		setChecked(value);
		setTheme(value ? 'dark' : 'light');
	};

	return (
		<div className={styles['theme-switcher']}>
			<Switch.Root checked={checked} onCheckedChange={onCheckedChangeHandler}>
				<Switch.Thumb />
			</Switch.Root>
		</div>
	);
};
