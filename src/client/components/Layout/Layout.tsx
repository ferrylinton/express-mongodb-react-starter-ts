import { Outlet } from 'react-router-dom';
import { AppProvider } from '../../providers/app-provider';
import { AlertMessageContainer } from '../AlertMessageContainer';
import { ConfirmDialog } from '../ConfirmDialog';
import { Navbar } from '../Navbar/Navbar';
import { Sidebar } from '../Sidebar/Sidebar';
import './Layout.css';

export default function Layout() {
	return (
		<AppProvider>
			<Navbar />
			<div className="main-wrapper">
				<Sidebar />
				<main className="main">
					<div className="main-content">
						<div className="container">
							<ConfirmDialog />
							<AlertMessageContainer />
							<Outlet />
						</div>
					</div>
				</main>
			</div>
		</AppProvider>
	);
}
