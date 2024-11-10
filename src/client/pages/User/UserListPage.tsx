import { AxiosResponse } from 'axios';
import { Suspense, useEffect } from 'react';
import { Await, defer, LoaderFunction, useLoaderData, useNavigation, useRevalidator, useSearchParams } from 'react-router-dom';
import { SimpleErrorBoundary } from '../../components/SimpleErrorBoundary';
import { UserTable } from '../../components/User/UserTable';
import { UserTableSkeleton } from '../../components/User/UserTableSkeleton';
import { axiosInstance } from '../../utils/axios';

interface LoaderData {
	response: Promise<AxiosResponse<Pageable<Omit<User, "password">>>>;
}

export const Component = () => {
	const loaderData = useLoaderData() as LoaderData;

	const navigation = useNavigation();

	if (navigation.state === 'loading') {
		return <UserTableSkeleton />;
	} else {
		return (
			<>
				<Suspense fallback={<UserTableSkeleton />}>
					<Await
						resolve={loaderData.response}
						errorElement={<SimpleErrorBoundary />}
						children={response => <UserTable response={response} />}
					/>
				</Suspense>
			</>
		);
	}

	
};

export const loader: LoaderFunction = ({ request }) => {
	const searchParams = new URL(request.url).searchParams;
	const keyword = searchParams.get("keyword");
	const page = searchParams.get("page");
	const params = { page, keyword };

	return defer({
		response: axiosInstance.get<Pageable<Omit<User, "password">>>(`/api/users`, { params }),
	});
};

export function ErrorBoundary() {
	return <SimpleErrorBoundary />;
}

Component.displayName = 'UserListRoute';
ErrorBoundary.displayName = 'UserErrorBoundary';
