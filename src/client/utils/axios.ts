import axios from 'axios';
import { getLoggedUser } from './cookie-util';

export const axiosInstance = axios.create({
	baseURL: '/',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	},
	validateStatus: function (status) {
		return (status >= 200 && status < 300) || status === 400 || status === 409;
	},
	timeout: 15000,
	timeoutErrorMessage: 'Request time out',
});

axiosInstance.interceptors.request.use(
	function (config) {
		if (!config.url?.includes('/api/token') || !config.url?.includes('/api/register')) {
			const loggedUser = getLoggedUser();
			config.headers.authorization = `Bearer ${loggedUser?.token}`;
			console.log(`Bearer ${loggedUser?.token}`);
		}

		return config;
	},
	function (error) {
		console.error(error);
		return Promise.reject(error);
	}
);
