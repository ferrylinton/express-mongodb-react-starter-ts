import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useConfirmStore } from '../../hooks/confirm-store';
import { TriangleDown } from '../../icons/TriangleDown';
import { TriangleUp } from '../../icons/TriangleUp';
import { UserIcon } from '../../icons/UserIcon';
import { useAppContext } from '../../providers/AppProvider';
import styles from './Dropdown.module.css';

export const ProfileMenu = () => {
	const [open, setOpen] = useState<boolean>(false);

	const intl = useIntl();

	const { showConfirm, hideConfirm } = useConfirmStore();

	const { logout } = useAppContext();

	const navigate = useNavigate();

	const handleLink = (pathname: string) => {
		navigate(pathname);
	};

	const okHandler = async () => {
		hideConfirm();
		logout();
	};

	const onClickLogout = () => {
		showConfirm(intl.formatMessage({ id: 'logout' }) + ' ?', okHandler);
	};

	return (
		<DropdownMenu.Root open={open} onOpenChange={() => setOpen(!open)}>
			<DropdownMenu.Trigger asChild>
				<button className={styles['dropdown-menu-trigger']} aria-label="Customise options">
					<UserIcon />
					{open ? <TriangleUp /> : <TriangleDown />}
				</button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content
					className={styles['dropdown-menu-content']}
					sideOffset={5}
					align="end"
				>
					<DropdownMenu.Item onClick={() => handleLink('/profile')}>
						<FormattedMessage id="profile" />
					</DropdownMenu.Item>
					<DropdownMenu.Item onClick={() => handleLink('/changepassword')}>
						<FormattedMessage id="changePassword" />
					</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item onClick={onClickLogout}>
						<FormattedMessage id="logout" />
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
};
