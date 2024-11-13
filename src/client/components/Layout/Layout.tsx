import { Outlet } from 'react-router-dom';
import { ToastProvider } from '../../providers/toast-provider';
import { AppProvider } from '../../providers/app-provider';
import { AlertMessageContainer } from '../AlertMessageContainer';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';
import { Navbar } from '../Navbar/Navbar';
import { Sidebar } from '../Sidebar/Sidebar';
import styles from './Layout.module.css';

export default function Layout() {
	return (
		<AppProvider>
			<ToastProvider>
				<Navbar />
				<div className={styles['main-wrapper']}>
					<Sidebar />
					<main className={styles['main']}>
						<ConfirmDialog />
						<AlertMessageContainer />
						<Outlet />
					</main>
				</div>
			</ToastProvider>
		</AppProvider>
	);
}
