import { Navigate, Outlet } from 'react-router-dom';
import { getLoggedUser } from '../utils/cookie-util';
import Cookies from 'js-cookie';
import { LOGGED_USER_COOKIE } from '../utils/constant';

export const ProtectedRoute = () => {
	const loggedUser = getLoggedUser();

	if (!loggedUser || !loggedUser.token) {
		Cookies.remove(LOGGED_USER_COOKIE);

		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
};
