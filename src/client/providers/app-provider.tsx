import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from '../utils/constant';
import enJson from '../messages/en.json';
import idJson from '../messages/id.json';

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

export const AppContext = createContext<AppContextProps>({
	getTheme,
	setTheme: (theme: Theme) => Function(theme),
	locale: DEFAULT_LOCALE,
	setLocale: () => Function(),
});

export const AppProvider = ({ children }: PropsWithChildren) => {
	const [locale, setCurrentLocale] = useState<string>(DEFAULT_LOCALE);

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

	const setLocale = (locale: string) => {
		setCurrentLocale(locale);
	};

	const value: AppContextProps = {
		getTheme,
		setTheme,
		locale,
		setLocale,
	};

	return (
		<AppContext.Provider value={value}>
			<IntlProvider
				key={locale}
				locale={locale}
				messages={locale === 'en' ? enJson : idJson}
				defaultLocale={DEFAULT_LOCALE}
			>
				{children}
			</IntlProvider>
		</AppContext.Provider>
	);
};

export const useAppContext = () => useContext(AppContext);
