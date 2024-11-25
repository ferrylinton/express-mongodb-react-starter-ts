import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DotFilledIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { EnglishIcon } from '../../icons/EnglishIcon';
import { IndonesiaIcon } from '../../icons/IndonesiaIcon';
import { TriangleDown } from '../../icons/TriangleDown';
import { TriangleUp } from '../../icons/TriangleUp';
import { useAppContext } from '../../providers/AppProvider';
import styles from './Dropdown.module.css';

export const LanguageMenu = () => {
	const { locale, setLocale } = useAppContext();

	const [open, setOpen] = useState<boolean>(false);

	return (
		<DropdownMenu.Root open={open} onOpenChange={() => setOpen(!open)}>
			<DropdownMenu.Trigger asChild>
				<button className={styles['dropdown-menu-trigger']} aria-label="Customise options">
					{locale === 'id' ? <IndonesiaIcon /> : <EnglishIcon />}
					{open ? <TriangleUp /> : <TriangleDown />}
				</button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content
					className={styles['dropdown-menu-content']}
					sideOffset={3}
					align="end"
				>
					<DropdownMenu.RadioGroup
						value={locale}
						onValueChange={(value: string) => setLocale(value)}
					>
						<DropdownMenu.RadioItem value="en">
							<DropdownMenu.ItemIndicator>
								<DotFilledIcon />
							</DropdownMenu.ItemIndicator>
							<EnglishIcon />
							<span>English</span>
						</DropdownMenu.RadioItem>
						<DropdownMenu.RadioItem value="id">
							<DropdownMenu.ItemIndicator>
								<DotFilledIcon />
							</DropdownMenu.ItemIndicator>
							<IndonesiaIcon />
							<span>Indonesia</span>
						</DropdownMenu.RadioItem>
					</DropdownMenu.RadioGroup>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
};
