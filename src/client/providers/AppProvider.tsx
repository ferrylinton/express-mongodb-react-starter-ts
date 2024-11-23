import Cookies from 'js-cookie';
import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { IntlProvider } from 'react-intl';
import enJson from '../messages/en.json';
import idJson from '../messages/id.json';
import { DEFAULT_LOCALE, LOGGED_USER_COOKIE } from '../utils/constant';
import { getLoggedUser } from '../utils/cookie-util';

const defaultValue: AppContextProps = {
	getSidebarState: () => true,
	toggleSidebar: () => Function(),
	locale: DEFAULT_LOCALE,
	setLocale: () => Function(),
	loggedUser: null,
	login: () => Function(),
	logout: () => Function(),
};

export const AppContext = createContext<AppContextProps>(defaultValue);

export const AppProvider = ({ children }: PropsWithChildren) => {
	const [locale, setCurrentLocale] = useState<string>(DEFAULT_LOCALE);

	const [loggedUser, setLoggedUser] = useState(getLoggedUser());

	const [showSidebar, setShowSidebar] = useState(false);

	const setLocale = (locale: string) => {
		setCurrentLocale(locale);
	};

	const login = (loggedUser: LoggedUser) => {
		setLoggedUser(loggedUser);
		const inFifteenMinutes = new Date(
			new Date().getTime() + parseInt(import.meta.env.JWT_EXPIRES_IN) * 60 * 1000
		);
		Cookies.set(LOGGED_USER_COOKIE, JSON.stringify(loggedUser), {
			expires: inFifteenMinutes,
		});
		window.location.replace('/');
	};

	const logout = () => {
		setShowSidebar(false);
		setLoggedUser(null);
		Cookies.remove(LOGGED_USER_COOKIE);
		window.location.replace('/login');
	};

	const toggleSidebar = () => {
		setShowSidebar(!showSidebar);
	};

	const getSidebarState = () => {
		return showSidebar;
	};

	const value: AppContextProps = {
		getSidebarState,
		toggleSidebar,
		locale,
		setLocale,
		loggedUser,
		login,
		logout,
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
