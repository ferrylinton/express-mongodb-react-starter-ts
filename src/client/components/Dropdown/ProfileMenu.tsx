import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { UserIcon } from '../../icons/UserIcon';
import { useAppContext } from '../../providers/AppProvider';
import styles from './Dropdown.module.css';

export const ProfileMenu = () => {
	const [open, setOpen] = useState<boolean>(false);

	const { logout } = useAppContext();

	const navigate = useNavigate();

	const handleLink = (pathname: string) => {
		navigate(pathname);
	};

	return (
		<DropdownMenu.Root open={open} onOpenChange={() => setOpen(!open)}>
			<DropdownMenu.Trigger asChild>
				<button className={styles['dropdown-menu-trigger']} aria-label="Customise options">
					<UserIcon />
					<span className={clsx(open ? 'triangle-up' : 'triangle-down')}></span>
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
					<DropdownMenu.Item onClick={() => logout()}>
						<FormattedMessage id="logout" />
					</DropdownMenu.Item>
					<DropdownMenu.Arrow />
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
};
