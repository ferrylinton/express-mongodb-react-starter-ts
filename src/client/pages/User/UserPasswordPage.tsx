import { AxiosResponse } from 'axios';
import { Suspense } from 'react';
import { Await, defer, LoaderFunction, useLoaderData } from 'react-router-dom';
import { SimpleErrorBoundary } from '../../components/SimpleErrorBoundary';
import { UserPasswordForm } from '../../components/User/UserPasswordForm';
import { UserPasswordSkeleton } from '../../components/User/UserPasswordSkeleton';
import { axiosInstance } from '../../utils/axios';

type LoaderData = {
	response: Promise<AxiosResponse<Omit<User, 'password'>>>;
};

export const Component = () => {
	const loaderData = useLoaderData() as LoaderData;

	return (
		<>
			<Suspense fallback={<UserPasswordSkeleton />}>
				<Await
					resolve={loaderData.response}
					errorElement={<SimpleErrorBoundary />}
					children={response => <UserPasswordForm response={response} />}
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

Component.displayName = 'UserPasswordRoute';
ErrorBoundary.displayName = 'UserPasswordErrorBoundary';
