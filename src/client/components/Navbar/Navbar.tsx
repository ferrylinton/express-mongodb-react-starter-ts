import { LanguageMenu } from '../LanguageMenu';
import { ProfileMenu } from '../ProfileMenu';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import { ToggleMenu } from '../ToggleMenu/ToggleMenu';
import './Navbar.css';

export const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="navbar-content">
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						gap: '0.3rem',
						margin: '0 0.5rem',
					}}
				>
					<ToggleMenu />
					<div className="logo">
						<a href="/">TODO</a>
					</div>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						gap: '0.3rem',
						margin: '0 0.5rem',
					}}
				>
					<ThemeSwitcher />
					<LanguageMenu />
					<ProfileMenu />
				</div>
			</div>
		</nav>
	);
};
