import { AxiosResponse } from 'axios';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import styles from '../../assets/css/DataDetail.module.css';
import { useConfirmStore } from '../../hooks/confirm-store';
import { axiosInstance } from '../../utils/axios';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';

type UserDetailProps = {
	response: AxiosResponse<Omit<User, 'password'>>;
};

export const UserDetail = ({ response }: UserDetailProps) => {
	const { data: user } = response;

	const { showConfirm, hideConfirm } = useConfirmStore();

	const intl = useIntl();

	const navigate = useNavigate();

	const okHandler = async () => {
		try {
			await axiosInstance.delete(`/api/users/${user.id}`);
			hideConfirm();
			navigate('/user', { replace: true });
		} catch (error: any) {
			console.log(error);
		}
	};

	const onClickDelete = () => {
		if (user) {
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
								<td>{user.id}</td>
							</tr>
							<tr>
								<th>
									<FormattedMessage id="email" />
								</th>
								<td>{user.email}</td>
							</tr>
							<tr>
								<th>
									<FormattedMessage id="username" />
								</th>
								<td>{user.username}</td>
							</tr>
							<tr>
								<th>
									<FormattedMessage id="locked" />
								</th>
								<td>
									{user.locked
										? intl.formatMessage({ id: 'yes' })
										: intl.formatMessage({ id: 'no' })}
								</td>
							</tr>
							<tr>
								<th>
									<FormattedMessage id="createdAt" />
								</th>
								<td>{intl.formatDate(user.createdAt)}</td>
							</tr>
							<tr>
								<th>
									<FormattedMessage id="updatedAt" />
								</th>
								<td>{user.updatedAt ? intl.formatDate(user.updatedAt) : '-'}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="flex gap-1 mt-3">
					<Button minWidth={100} onClick={() => navigate('/user')}>
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
