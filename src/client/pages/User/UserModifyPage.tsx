import { AxiosResponse } from 'axios';
import { Suspense } from 'react';
import { Await, defer, LoaderFunction, useLoaderData } from 'react-router-dom';
import { SimpleErrorBoundary } from '../../components/SimpleErrorBoundary';
import { UserModifyForm } from '../../components/User/UserModifyForm';
import { axiosInstance } from '../../utils/axios';
import { UserModifySkeleton } from '../../components/User/UserModifySkeleton';

type LoaderData = {
	response: Promise<AxiosResponse<Omit<User, 'password'>>>;
};

export const Component = () => {
	const loaderData = useLoaderData() as LoaderData;

	return (
		<>
			<Suspense fallback={<UserModifySkeleton />}>
				<Await
					resolve={loaderData.response}
					errorElement={<SimpleErrorBoundary />}
					children={response => <UserModifyForm response={response} />}
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

Component.displayName = 'UserModifyRoute';
ErrorBoundary.displayName = 'UserModifyErrorBoundary';
