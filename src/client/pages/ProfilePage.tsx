import { AxiosResponse } from 'axios';
import { Suspense } from 'react';
import { Await, defer, LoaderFunction, useLoaderData } from 'react-router-dom';
import { SimpleErrorBoundary } from '../components/SimpleErrorBoundary';
import { Profile } from '../components/User/Profile';
import { ProfileSkeleton } from '../components/User/ProfileSkeleton';
import { axiosInstance } from '../utils/axios';
import { getLoggedUser } from '../utils/cookie-util';

type LoaderData = {
	response: Promise<AxiosResponse<Omit<User, 'password'>>>;
};

export const Component = () => {
	const loaderData = useLoaderData() as LoaderData;

	return (
		<>
			<Suspense fallback={<ProfileSkeleton />}>
				<Await
					resolve={loaderData.response}
					errorElement={<SimpleErrorBoundary />}
					children={response => <Profile response={response} />}
				/>
			</Suspense>
		</>
	);
};

export const loader: LoaderFunction = () => {
	const loggedUser = getLoggedUser();
	return defer({
		response: axiosInstance.get<Omit<User, 'password'>>(`/api/users/${loggedUser?.id}`),
	});
};

export function ErrorBoundary() {
	return <SimpleErrorBoundary />;
}

Component.displayName = 'ProfileRoute';
ErrorBoundary.displayName = 'ProfileErrorBoundary';
