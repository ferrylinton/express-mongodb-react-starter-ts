import { LanguageMenu } from '../Dropdown/LanguageMenu';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import styles from './Navbar.module.css';

export const PublicNavbar = () => {
	return (
		<nav className={styles['navbar']}>
			<div className="w-full flex justify-between items-center max-w-2xl">
				<div className="logo">Simple Admin</div>
				<div className="flex">
					<ThemeSwitcher />
					<LanguageMenu />
				</div>
			</div>
		</nav>
	);
};
