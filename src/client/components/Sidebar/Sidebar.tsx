import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { CollapsibleMenuItem } from './CollapsibleMenuItem';
import { LOGGED_USER_COOKIE } from '../../utils/constant';
import { useAppContext } from '../../providers/app-provider';
import { toggleSidebar } from '../../utils/app-util';

export const Sidebar = () => {
	const { loggedUser, setLogggedUser } = useAppContext();

	const navigate = useNavigate();

	const handleLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		toggleSidebar();
		navigate(event.currentTarget.pathname);
	};

	const logout = () => {
		toggleSidebar();
		Cookies.remove(LOGGED_USER_COOKIE);
		setLogggedUser(null);
		navigate('/login');
	};

	if (loggedUser) {
		return (
			<>
				<div className="sidebar-overlay"></div>
				<aside className="sidebar">
					<div className="sidebar-menu">
						<Link onClick={handleLink} to="/">
							Home
						</Link>
						<CollapsibleMenuItem label={'Profile'}>
							<Link onClick={handleLink} to="/profile">
								View Profile
							</Link>
							<Link onClick={handleLink} to="/changepassword">
								Change Password
							</Link>
						</CollapsibleMenuItem>
						<CollapsibleMenuItem label={'Todo'}>
							<Link onClick={handleLink} to="/todo">
								View Todoes
							</Link>
							<Link onClick={handleLink} to="/todo/create">
								Create Todo
							</Link>
						</CollapsibleMenuItem>
					</div>
					<button className="btn btn-primary" onClick={() => logout()}>
						Logout
					</button>
				</aside>
			</>
		);
	} else {
		return null;
	}
};
