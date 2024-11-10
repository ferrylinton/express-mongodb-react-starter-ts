import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { IntlProvider } from 'react-intl';
import enJson from '../messages/en.json';
import idJson from '../messages/id.json';
import { DEFAULT_LOCALE, LOGGED_USER_COOKIE } from '../utils/constant';
import { getLoggedUser } from '../utils/cookie-util';
import Cookies from 'js-cookie';

export const AppContext = createContext<AppContextProps>({
	locale: DEFAULT_LOCALE,
	setLocale: () => Function(),
	loggedUser: null,
	setLogggedUser: () => Function(),
});

export const AppProvider = ({ children }: PropsWithChildren) => {
	const [locale, setCurrentLocale] = useState<string>(DEFAULT_LOCALE);

	const [loggedUser, _setLogggedUser] = useState(getLoggedUser());

	const setLocale = (locale: string) => {
		setCurrentLocale(locale);
	};

	const setLogggedUser = (loggedUser: LoggedUser | null) => {
		_setLogggedUser(loggedUser);
		const inFifteenMinutes = new Date(new Date().getTime() + (parseInt(import.meta.env.JWT_EXPIRES_IN)) * 60 * 1000);
		Cookies.set(LOGGED_USER_COOKIE, JSON.stringify(loggedUser), {
			expires: inFifteenMinutes,
		});
	};

	const value: AppContextProps = {
		locale,
		setLocale,
		loggedUser,
		setLogggedUser,
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
