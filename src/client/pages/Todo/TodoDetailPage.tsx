import { AxiosResponse } from 'axios';
import { Suspense } from 'react';
import { Await, defer, LoaderFunction, useLoaderData } from 'react-router-dom';
import { SimpleErrorBoundary } from '../../components/SimpleErrorBoundary';
import { TodoDetail } from '../../components/Todo/TodoDetail';
import { TodoDetailSkeleton } from '../../components/Todo/TodoDetailSkeleton';
import { axiosInstance } from '../../utils/axios';

type LoaderData = {
	response: Promise<AxiosResponse<Todo>>;
};

export const Component = () => {
	const loaderData = useLoaderData() as LoaderData;

	return (
		<>
			<Suspense fallback={<TodoDetailSkeleton />}>
				<Await
					resolve={loaderData.response}
					errorElement={<SimpleErrorBoundary />}
					children={response => <TodoDetail response={response} />}
				/>
			</Suspense>
		</>
	);
};

export const loader: LoaderFunction = ({ params }) => {
	return defer({
		response: axiosInstance.get<Todo>(`/api/todoes/${params.id}`),
	});
};

export function ErrorBoundary() {
	return <SimpleErrorBoundary />;
}

Component.displayName = 'TodoDetailRoute';
ErrorBoundary.displayName = 'TodoDetailErrorBoundary';
