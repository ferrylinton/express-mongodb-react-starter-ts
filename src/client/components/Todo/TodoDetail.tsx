import { AxiosResponse } from 'axios';
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import styles from '../../assets/css/DataDetail.module.css';
import { useConfirmStore } from '../../hooks/confirm-store';
import { axiosInstance } from '../../utils/axios';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';

type TodoDetailProps = {
	response: AxiosResponse<Todo>;
};

export const TodoDetail = ({ response }: TodoDetailProps) => {
	const { data: todo } = response;

	const { showConfirm, hideConfirm } = useConfirmStore();

	const intl = useIntl();

	const navigate = useNavigate();

	const okHandler = async () => {
		try {
			await axiosInstance.delete(`/api/todo/${todo.id}`);
			hideConfirm();
			navigate('/todo', { replace: true });
		} catch (error: any) {
			console.log(error);
		}
	};

	const onClickDelete = () => {
		if (todo) {
			showConfirm(intl.formatMessage({ id: 'deleteData' }), okHandler);
		}
	};

	return (
		<>
			<Card title={intl.formatMessage({ id: 'detail' })} style={{ maxWidth: 700 }}>
				<div className={styles['data-detail']}>
					<table>
						<tbody>
							<tr>
								<th>
									<FormattedMessage id="id" />
								</th>
								<td>{todo.id}</td>
							</tr>
							<tr>
								<th>
									<FormattedMessage id="task" />
								</th>
								<td className="break">{todo.task}</td>
							</tr>
							<tr>
								<th>
									<FormattedMessage id="done" />
								</th>
								<td>{intl.formatMessage({ id: todo.done ? 'yes' : 'no' })}</td>
							</tr>
							<tr>
								<th>
									<FormattedMessage id="createdAt" />
								</th>
								<td>
									<FormattedDate value={new Date(todo.createdAt)} />
								</td>
							</tr>
							<tr>
								<th>
									<FormattedMessage id="updatedAt" />
								</th>
								<td>{todo.updatedAt ? intl.formatDate(todo.updatedAt) : '-'}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="flex gap-1 mt-3">
					<Button minWidth={100} onClick={() => navigate('/todo')}>
						<FormattedMessage id="back" />
					</Button>
					<Button minWidth={100} variant="danger" onClick={onClickDelete}>
						<FormattedMessage id="delete" />
					</Button>
				</div>
			</Card>
		</>
	);
};
