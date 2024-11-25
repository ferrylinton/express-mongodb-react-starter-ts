import { Outlet } from 'react-router-dom';
import { AppProvider } from '../../providers/AppProvider';
import { ToastProvider } from '../../providers/ToastProvider';

import clsx from 'clsx';
import { PublicNavbar } from '../Navbar/PublicNavbar';
import styles from './Layout.module.css';

export default function PublicLayout() {
	return (
		<AppProvider>
			<ToastProvider>
				<div className={clsx(styles.layout, 'flex-col', 'justify-center', 'items-center')}>
					<PublicNavbar />
					<Outlet />
				</div>
			</ToastProvider>
		</AppProvider>
	);
}
