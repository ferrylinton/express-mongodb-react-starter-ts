import { AxiosResponse } from 'axios';
import { UserItem } from './UserItem';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { CheckIcon } from '../../icons/CheckIcon';
import EyeIcon from '../../icons/EyeIcon';
import { SearchForm } from '../SearchForm/SearchForm';
import { Pager } from '../Pager/Pager';
import { TablePopMenu } from '../TablePopMenu/TablePopMenu';

export type LoaderData = {
	response: AxiosResponse<Pageable<Omit<User, "password">>>;
};

export const UserTable = ({ response }: LoaderData) => {
	const result = response.data as Pageable<Omit<User, "password">>;

	const total = result.pagination.total;

	return (
		<>
			<div className="data-toolbar">
				<SearchForm action='/user'/>
			</div>
			<div className="data-list">
				<div className='table-data'>
					<table>
						<thead>
							<tr>
								<th>#</th>
								<th><FormattedMessage id="username" /></th>
								<th><FormattedMessage id="email" /></th>
								<th><FormattedMessage id="createdAt" /></th>
							</tr>
						</thead>
						<tbody>
							{result.data.map((user, index) => {
								return <UserItem key={index} index={result.pagination.page * result.pagination.pageSize + index + 1} user={user} />;
							})}
						</tbody>
					</table>
				</div>
				<div className='table-action'>
					<table>
						<thead>
							<tr>
								<th>&nbsp;</th>
							</tr>
						</thead>
						<tbody>
							{result.data.map((user, index) => {
								return <tr key={index}>
									<td>
										<TablePopMenu detail={`/detail/${user.id}` } />
									</td>
								</tr>;
							})}
						</tbody>
					</table>
				</div>
			</div>
			<Pager pagination={result.pagination} />
		</>
	);
};
