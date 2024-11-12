import { AxiosResponse } from 'axios';
import { Suspense } from 'react';
import { Await, defer, LoaderFunction, useLoaderData } from 'react-router-dom';
import { UserDetail } from '../../components/User/UserDetail';
import { UserDetailSkeleton } from '../../components/User/UserDetailSkeleton';
import { SimpleErrorBoundary } from '../../components/SimpleErrorBoundary';
import { axiosInstance } from '../../utils/axios';

type LoaderData = {
	response: Promise<AxiosResponse<Omit<User, 'password'>>>;
};

export const Component = () => {
	const loaderData = useLoaderData() as LoaderData;
	return (
		<>
			<Suspense fallback={<UserDetailSkeleton />}>
				<Await
					resolve={loaderData.response}
					errorElement={<SimpleErrorBoundary />}
					children={response => <UserDetail response={response} />}
				/>
			</Suspense>
		</>
	);
};

export const loader: LoaderFunction = ({ params }) => {
	return defer({
		response: axiosInstance.get<Omit<User, 'password'>>(`/api/users/${params.id}`),
	});
};

export function ErrorBoundary() {
	return <SimpleErrorBoundary />;
}

Component.displayName = 'UserDetailRoute';
ErrorBoundary.displayName = 'UserDetailErrorBoundary';
