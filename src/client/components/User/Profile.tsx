import { AxiosResponse } from 'axios';
import { FormattedMessage, useIntl } from 'react-intl';
import styles from '../../assets/css/DataDetail.module.css';

type ProfileProps = {
	response: AxiosResponse<Omit<User, 'password'>>;
};

export const Profile = ({ response }: ProfileProps) => {
	const { data: user } = response;

	const intl = useIntl();

	return (
		<>
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
		</>
	);
};
