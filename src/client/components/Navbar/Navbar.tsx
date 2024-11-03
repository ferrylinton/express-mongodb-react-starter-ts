import { useAppContext } from '../../providers/app-provider';
import { LanguageMenu } from '../Dropdown/LanguageMenu';
import { ProfileMenu } from '../Dropdown/ProfileMenu';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import { ToggleMenu } from '../ToggleMenu/ToggleMenu';
import styles from './Navbar.module.css';

export const Navbar = () => {
	const { loggedUser } = useAppContext();

	return (
		<nav className={styles['navbar']}>
			<div className={styles['navbar-group']}>
				{loggedUser && <ToggleMenu />}
				<div className={styles['logo']}>
					<a href="/">Simple Admin</a>
				</div>
			</div>
			<div className={styles['navbar-group']}>
				<ThemeSwitcher />
				<LanguageMenu />
				{loggedUser && <ProfileMenu />}
			</div>
		</nav>
	);
};
