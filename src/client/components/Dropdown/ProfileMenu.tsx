import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon } from '../../icons/UserIcon';
import { useAppContext } from '../../providers/app-provider';
import { LOGGED_USER_COOKIE } from '../../utils/constant';

export const ProfileMenu = () => {
	const [open, setOpen] = useState<boolean>(false);

	const { setLogggedUser } = useAppContext();

	const navigate = useNavigate();

	const handleLink = (pathname: string) => {
		navigate(pathname);
	};

	const logout = () => {
		Cookies.remove(LOGGED_USER_COOKIE);
		setLogggedUser(null);
		navigate('/login');
	};

	return (
		<DropdownMenu.Root open={open} onOpenChange={() => setOpen(!open)}>
			<DropdownMenu.Trigger asChild>
				<button className="dropdown-menu-trigger" aria-label="Customise options">
					<UserIcon />
					<span className={clsx(open ? 'triangle-up' : 'triangle-down')}></span>
				</button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content className="dropdown-menu-content" sideOffset={5} align="end">
					<DropdownMenu.Item onClick={() => handleLink('/profile')}>
						Profile
					</DropdownMenu.Item>
					<DropdownMenu.Item onClick={() => logout()}>Logout</DropdownMenu.Item>
					<DropdownMenu.Arrow />
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
};
