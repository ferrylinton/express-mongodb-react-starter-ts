import { Outlet } from 'react-router-dom';
import { AppProvider } from '../../providers/AppProvider';
import { ToastProvider } from '../../providers/ToastProvider';
import { AlertMessageContainer } from '../AlertMessageContainer';

import { PublicNavbar } from '../Navbar/PublicNavbar';
import styles from './Layout.module.css';
import clsx from 'clsx';

export default function PublicLayout() {
	return (
		<AppProvider>
			<ToastProvider>
				<div className={clsx(styles.layout, 'flex-col', 'justify-center', 'items-center')}>
					<PublicNavbar />
					<AlertMessageContainer />
					<Outlet />
				</div>
			</ToastProvider>
		</AppProvider>
	);
}
