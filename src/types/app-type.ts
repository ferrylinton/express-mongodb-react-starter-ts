type Theme = 'light' | 'dark';

type AppContextProps = {
	locale: string;
	setLocale: (locale: string) => void;
	loggedUser: LoggedUser | null;
	setLogggedUser: (loggedUser: LoggedUser | null) => void;
};

type ToastContextProps = {
	toast: (message: string) => void;
};
