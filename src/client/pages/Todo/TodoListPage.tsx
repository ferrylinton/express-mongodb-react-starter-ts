import { AxiosResponse } from 'axios';
import { Suspense } from 'react';
import { Await, defer, LoaderFunction, useLoaderData } from 'react-router-dom';
import { SimpleErrorBoundary } from '../../components/SimpleErrorBoundary';
import { TodoTable } from '../../components/Todo/TodoTable';
import { TodoTableSkeleton } from '../../components/Todo/TodoTableSkeleton';
import { axiosInstance } from '../../utils/axios';

interface LoaderData {
	response: Promise<AxiosResponse<Todo[]>>;
}

export const Component = () => {
	const loaderData = useLoaderData() as LoaderData;

	return (
		<>
			<Suspense fallback={<TodoTableSkeleton />}>
				<Await
					resolve={loaderData.response}
					errorElement={<SimpleErrorBoundary />}
					children={response => <TodoTable response={response} />}
				/>
			</Suspense>
		</>
	);
};

export const loader: LoaderFunction = () => {
	return defer({
		response: axiosInstance.get<Todo[]>(`/api/todoes`),
	});
};

export function ErrorBoundary() {
	return <SimpleErrorBoundary />;
}

Component.displayName = 'TodoRoute';
ErrorBoundary.displayName = 'TodoErrorBoundary';
