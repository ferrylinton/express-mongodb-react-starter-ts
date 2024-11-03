import clsx from 'clsx';
import { FormattedDate, useIntl } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import { useAlertStore } from '../../hooks/alert-store';
import { useConfirmStore } from '../../hooks/confirm-store';
import { CheckIcon } from '../../icons/CheckIcon';
import EyeIcon from '../../icons/EyeIcon';
import { axiosInstance } from '../../utils/axios';

type Props = {
	index: number;
	todo: Todo;
};

export const TodoItem = ({ index, todo }: Props) => {
	const intl = useIntl();

	const navigate = useNavigate();

	const { alert } = useAlertStore();

	const { showConfirm, hideConfirm } = useConfirmStore();

	const okHandler = async () => {
		try {
			await axiosInstance.put<Todo>(`/api/todoes/${todo.id}`);
			alert.success(
				intl.formatMessage({ id: 'dataIsUpdated' }, { task: todo?.task }) as string
			);

			hideConfirm();
			navigate('/', { replace: true });
		} catch (error: any) {
			console.log(error);
			alert.error(error.response.data.message);
		}
	};

	const onClickUpdate = () => {
		showConfirm(intl.formatMessage({ id: 'updateData' }), okHandler);
	};

	return (
		<>
			<tr className={clsx(todo.done && 'task-done')}>
				<td>{index + 1} </td>
				<td>
					<span>{todo.task}</span>
					<em>
						<FormattedDate value={new Date(todo.createdAt)} />
					</em>
				</td>
				<td>
					<div className="action">
						<button className="btn btn-primary" onClick={onClickUpdate}>
							<CheckIcon />
						</button>
						<Link to={'/detail/' + todo.id} className="btn btn-secondary">
							<EyeIcon />
						</Link>
					</div>
				</td>
			</tr>
		</>
	);
};
