import { AxiosResponse } from "axios";
import { Suspense, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Await, defer, isRouteErrorResponse, Link, LoaderFunction, useActionData, useAsyncError, useLoaderData, useLocation, useNavigation, useRouteError } from 'react-router-dom';
import { AwaitErrorBoundary } from "../components/AwaitErrorBoundary";
import { TodoTable } from "../components/TodoTable";
import { TodoTableSkeleton } from "../components/TodoTableSkeleton";
import { useAlertStore } from "../hooks/alert-store";
import * as todoService from "../services/todo-service";

interface LoaderData {
	response: AxiosResponse<Todo[]>;
}

export const Component = () => {

	const intl = useIntl();

	const location = useLocation();

	const [total, setTotal] = useState<number>(0);

	const { alert } = useAlertStore();

	const navigation = useNavigation();

	const error = useRouteError() as any;

	const loaderData = useLoaderData() as LoaderData;

	useEffect(() => {
		console.log(error);
	}, [error])

	useEffect(() => {
		console.log(navigation);
	}, [navigation])


	return (
		<>
			<div className="todo-list-toolbar">
				<div className="total">
					<FormattedMessage id="total" values={{ total }} />
				</div>
				<Link to={"/add"} className="btn btn-primary">
					<FormattedMessage id="newTask" />
				</Link>
			</div>

			<div className="todo-list">

				<Suspense fallback={<TodoTableSkeleton />}>
					<Await
						resolve={loaderData.response}
						errorElement={<AwaitErrorBoundary />}
						children={(response) => <TodoTable response={response} />}>
					</Await>
				</Suspense>

			</div >
		</>
	)
}

export const loader: LoaderFunction = () => {
	return defer({
		response: todoService.find()
	});
};


export function ErrorBoundary() {
	const error = useRouteError() as any;
	return isRouteErrorResponse(error) ? (
		<h1>
			{error.status} {error.statusText}
		</h1>
	) : (
		<h1>{error.message || error}</h1>
	);
}

Component.displayName = "HomeRoute";
ErrorBoundary.displayName = "HomeErrorBoundary";