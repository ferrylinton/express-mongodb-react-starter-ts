import axios from 'axios';
import { getLoggedUser } from './cookie-util';
import Cookies from 'js-cookie';
import { LOGGED_USER_COOKIE } from './constant';

export const axiosInstance = axios.create({
	baseURL: '/',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	},
	timeout: 15000,
	timeoutErrorMessage: 'Request time out',
});

axiosInstance.interceptors.request.use(
	function (config) {
		const loggedUser = getLoggedUser();

		if (
			loggedUser &&
			(!config.url?.includes('/api/token') || !config.url?.includes('/api/register'))
		) {
			config.headers.authorization = `Bearer ${loggedUser?.token}`;
		}

		return config;
	},

	function (error) {
		console.error(error);
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		console.log(window.location.href);
		if (error.status === 401 && !window.location.href.includes('/login')) {
			Cookies.remove(LOGGED_USER_COOKIE);
			window.location.replace('/login');
		}
		return Promise.reject(error);
	}
);
