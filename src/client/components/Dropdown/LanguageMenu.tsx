import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DotFilledIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { useState } from 'react';
import { EnglishIcon } from '../../icons/EnglishIcon';
import { IndonesiaIcon } from '../../icons/IndonesiaIcon';
import { useAppContext } from '../../providers/app-provider';

export const LanguageMenu = () => {
	const { locale, setLocale } = useAppContext();

	const [open, setOpen] = useState<boolean>(false);

	return (
		<DropdownMenu.Root open={open} onOpenChange={() => setOpen(!open)}>
			<DropdownMenu.Trigger asChild>
				<button className="dropdown-menu-trigger" aria-label="Customise options">
					{locale === 'id' ? <IndonesiaIcon /> : <EnglishIcon />}
					<span className={clsx(open ? 'triangle-up' : 'triangle-down')}></span>
				</button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content className="dropdown-menu-content" sideOffset={5} align="end">
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
					<DropdownMenu.Arrow />
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
};
