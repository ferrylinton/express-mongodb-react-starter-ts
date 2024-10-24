import { useAsyncError } from 'react-router-dom';
import { useAlertStore } from '../hooks/alert-store';
import { useEffect } from 'react';

export const AwaitErrorBoundary = () => {
	const { alert } = useAlertStore();
	const error = useAsyncError() as any;

	useEffect(() => {
		alert.error(error.response.data.message || error.message);
	}, [error]);

	return <div>{error.response.data.message || error.message}</div>;
};
