import clsx from 'clsx';
import { FormattedDate, useIntl } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import { useAlertStore } from '../../hooks/alert-store';
import { useConfirmStore } from '../../hooks/confirm-store';
import { CheckIcon } from '../../icons/CheckIcon';
import EyeIcon from '../../icons/EyeIcon';
import { axiosInstance } from '../../utils/axios';
import { Truncate } from '../Truncate/Truncate';

type Props = {
	index: number;
	user: Omit<User, "password">;
};

export const UserItem = ({ index, user }: Props) => {
	const intl = useIntl();

	const navigate = useNavigate();

	const { alert } = useAlertStore();

	const { showConfirm, hideConfirm } = useConfirmStore();

	const okHandler = async () => {
		try {
			await axiosInstance.put<User>(`/api/useres/${user.id}`);
			alert.success(
				intl.formatMessage({ id: 'dataIsUpdated' }, { task: user?.username }) as string
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
			<tr>
				<td>{index } </td>
				<td>{user.username}</td>
				<td><Truncate content={user.email} /></td>
				<td><FormattedDate value={new Date(user.createdAt)} /></td>
			</tr>
		</>
	);
};
