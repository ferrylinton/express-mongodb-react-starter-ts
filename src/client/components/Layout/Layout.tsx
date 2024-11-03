import { Outlet } from 'react-router-dom';
import { AppProvider, useAppContext } from '../../providers/app-provider';
import { AlertMessageContainer } from '../AlertMessageContainer';
import { ConfirmDialog } from '../ConfirmDialog';
import { Navbar } from '../Navbar/Navbar';
import { Sidebar } from '../Sidebar/Sidebar';
import { useEffect } from 'react';

export default function Layout() {
	return (
		<AppProvider>
			<Navbar />
			<div className="main-wrapper">
				<Sidebar />
				<main className="main">
					<ConfirmDialog />
					<AlertMessageContainer />
					<Outlet />
				</main>
			</div>
		</AppProvider>
	);
}
