import { isRouteErrorResponse, useAsyncError } from 'react-router-dom';

export const SimpleErrorBoundary = () => {
	const error = useAsyncError() as any;

	return (
		<div className="alert alert-danger">
			{isRouteErrorResponse(error) ? (
				<p>
					{error.status} {error.statusText}
				</p>
			) : (
				<p>{error.response.data.message || error.message}</p>
			)}
		</div>
	);
};
