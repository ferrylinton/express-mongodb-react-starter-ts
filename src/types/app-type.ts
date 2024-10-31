type Theme = 'light' | 'dark';

type AppContextProps = {
	getTheme: () => string;
	setTheme: (theme: Theme) => void;
	locale: string;
	setLocale: (locale: string) => void;
};
