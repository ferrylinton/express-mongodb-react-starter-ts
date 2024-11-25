import { isRouteErrorResponse, useAsyncError } from 'react-router-dom';
import styles from '../assets/css/Alert.module.css';
import { WarningIcon } from '../icons/WarningIcon';

export const SimpleErrorBoundary = () => {
	const error = useAsyncError() as any;

	return (
		<div className="w-full h-full flex justify-center items-center">
			<div className={styles['alert-danger']}>
				<WarningIcon />
				{isRouteErrorResponse(error) ? (
					<p>
						{error.status} {error.statusText}
					</p>
				) : (
					<p>{error.response.data.message || error.message}</p>
				)}
			</div>
		</div>
	);
};
