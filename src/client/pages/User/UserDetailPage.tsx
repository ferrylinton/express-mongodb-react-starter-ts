import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import {
	isRouteErrorResponse,
	Link,
	LoaderFunction,
	useLoaderData,
	useNavigate,
	useRouteError,
} from 'react-router-dom';
import { useAlertStore } from '../../hooks/alert-store';
import { useConfirmStore } from '../../hooks/confirm-store';
import { axiosInstance } from '../../utils/axios';

export const Component = () => {
	const intl = useIntl();

	const navigate = useNavigate();

	const { alert } = useAlertStore();

	const { showConfirm, hideConfirm } = useConfirmStore();

	const user = useLoaderData() as User | null;

	const okHandler = async () => {
		try {
			await axiosInstance.delete(`/api/users/${user?.id}`);
			alert.success(
				intl.formatMessage({ id: 'dataIsDeleted' }, { task: user?.username }) as string
			);

			hideConfirm();
			navigate('/', { replace: true });
		} catch (error: any) {
			console.log(error);
			alert.error(error.response.data.message);
		}
	};

	const onClickDelete = () => {
		if (user) {
			showConfirm(intl.formatMessage({ id: 'deleteData' }), okHandler);
		}
	};

	return (
		<>
			<div className="user-detail">
				<table>
					{!user && (
						<tbody>
							{['id', 'task', 'done', 'createdAt', 'updatedAt'].map(txt => {
								return (
									<tr key={txt}>
										<th>
											<FormattedMessage id={txt} />
										</th>
										<td>
											<div className="skeleton-line"></div>
										</td>
									</tr>
								);
							})}
						</tbody>
					)}
					{user && (
						<tbody>
							<tr>
								<th>
									<FormattedMessage id="id" />
								</th>
								<td>{user.id}</td>
							</tr>
							<tr>
								<th>
									<FormattedMessage id="task" />
								</th>
								<td className="break">{user.username}</td>
							</tr>
							<tr>
								<th>
									<FormattedMessage id="done" />
								</th>
								<td></td>
							</tr>
							<tr>
								<th>
									<FormattedMessage id="createdAt" />
								</th>
								<td>
									<FormattedDate value={new Date(user.createdAt)} />
								</td>
							</tr>
							<tr>
								<th>
									<FormattedMessage id="updatedAt" />
								</th>
								<td>{user.updatedAt ? intl.formatDate(user.updatedAt) : '-'}</td>
							</tr>
						</tbody>
					)}
				</table>
			</div>

			<section className="buttons">
				<Link to={'/'} className="btn btn-secondary">
					<FormattedMessage id="back" />
				</Link>
				{user && (
					<button type="button" className="btn btn-danger" onClick={onClickDelete}>
						<FormattedMessage id="delete" />
					</button>
				)}
			</section>
		</>
	);
};

export const loader: LoaderFunction = async ({ params }) => {
	try {
		const { data } = await axiosInstance.get(`/api/users/${params.id}`);
		return data;
	} catch (error: any) {
		console.error(error);
		return {};
	}
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

Component.displayName = 'UserDetailRoute';
ErrorBoundary.displayName = 'UserDetailErrorBoundary';
