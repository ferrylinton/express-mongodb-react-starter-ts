import Cookies from 'js-cookie';
import { FormattedMessage } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../providers/app-provider';
import { toggleSidebar } from '../../utils/app-util';
import { LOGGED_USER_COOKIE } from '../../utils/constant';
import { Button } from '../Button/Button';
import { CollapsibleMenuItem } from './CollapsibleMenuItem';

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
						<CollapsibleMenuItem label={'User'}>
							<Link onClick={handleLink} to="/user">
								View User
							</Link>
							<Link onClick={handleLink} to="/user/create">
								Create User
							</Link>
						</CollapsibleMenuItem>
					</div>
					<Button variant='primary' size='big' onClick={() => logout()} className='m-2'>
						<FormattedMessage id="logout" />
					</Button>
				</aside>
			</>
		);
	} else {
		return null;
	}
};
