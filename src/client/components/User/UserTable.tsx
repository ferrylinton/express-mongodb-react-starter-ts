import { AxiosResponse } from 'axios';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import styles from '../../assets/css/DataList.module.css';
import { useConfirmStore } from '../../hooks/confirm-store';
import { axiosInstance } from '../../utils/axios';
import { Pager } from '../Pager/Pager';
import { SearchForm } from '../SearchForm/SearchForm';
import { TablePopMenu } from '../TablePopMenu/TablePopMenu';
import { UserItem } from './UserItem';

type UserTableProps = {
	response: AxiosResponse<Pageable<Omit<User, 'password'>>>;
};

export const UserTable = ({ response }: UserTableProps) => {
	const result = response.data as Pageable<Omit<User, 'password'>>;

	const { showConfirm, hideConfirm } = useConfirmStore();

	const intl = useIntl();

	const navigate = useNavigate();

	const goToDetail = (id: string) => {
		navigate(`/user/detail/${id}`);
	};

	const okHandler = async (user: Omit<User, 'password'>) => {
		try {
			await axiosInstance.put(`/api/users/${user.id}`, { locked: !user.locked });
			hideConfirm();
			navigate('/user', { replace: true });
		} catch (error: any) {
			console.log(error);
		}
	};

	const toggleLockUser = (user: Omit<User, 'password'>) => {
		showConfirm(
			intl.formatMessage(
				{ id: user.locked ? 'unlockUser' : 'lockUser' },
				{ username: user.username }
			),
			() => okHandler(user)
		);
	};

	return (
		<>
			<div className={styles['data-toolbar']}>
				<SearchForm action="/user" />
			</div>
			<div className={styles['data-list']}>
				<div table-type="data">
					<table>
						<thead>
							<tr>
								<th>#</th>
								<th>
									<FormattedMessage id="username" />
								</th>
								<th>
									<FormattedMessage id="email" />
								</th>
								<th>
									<FormattedMessage id="createdAt" />
								</th>
							</tr>
						</thead>
						<tbody>
							{result.pagination.total === 0 && (
								<tr>
									<td colSpan={4}>
										<div className="no-records">
											<FormattedMessage id="noRecords" />
										</div>
									</td>
								</tr>
							)}
							{result.data.map((user, index) => {
								return (
									<UserItem
										key={index}
										index={
											result.pagination.page * result.pagination.pageSize +
											index +
											1
										}
										user={user}
									/>
								);
							})}
						</tbody>
					</table>
				</div>
				<div table-type="action">
					<table>
						<thead>
							<tr>
								<th>&nbsp;</th>
							</tr>
						</thead>
						<tbody>
							{result.data.map((user, index) => {
								return (
									<tr key={index}>
										<td>
											<TablePopMenu
												locked={user.locked}
												goToDetail={() => goToDetail(user.id)}
												toggleLockUser={() => toggleLockUser(user)}
											/>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
			<Pager pagination={result.pagination} />
		</>
	);
};
