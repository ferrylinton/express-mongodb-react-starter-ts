import { FormattedDate } from 'react-intl';
import { Truncate } from '../Truncate/Truncate';
import clsx from 'clsx';

type Props = {
	index: number;
	user: Omit<User, 'password'>;
};

export const UserTableItem = ({ index, user }: Props) => {
	return (
		<>
			<tr data-locked={user.locked}>
				<td>{index} </td>
				<td>{user.username}</td>
				<td>
					<Truncate content={user.email} />
				</td>
				<td>
					<FormattedDate value={new Date(user.createdAt)} />
				</td>
			</tr>
		</>
	);
};
