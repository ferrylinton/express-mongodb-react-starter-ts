import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { AvatarIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { useState } from 'react';
import { UserIcon } from '../icons/UserIcon';

export const ProfileMenu = () => {
	const [open, setOpen] = useState<boolean>(false);

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
					<DropdownMenu.Item>Profile</DropdownMenu.Item>
					<DropdownMenu.Item>Logout</DropdownMenu.Item>
					<DropdownMenu.Arrow className="DropdownMenuArrow" />
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
};
