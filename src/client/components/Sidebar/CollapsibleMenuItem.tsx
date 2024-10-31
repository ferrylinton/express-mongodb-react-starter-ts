import * as Collapsible from '@radix-ui/react-collapsible';
import clsx from 'clsx';
import { ReactNode, useState } from 'react';
import styles from './CollapsibleMenuItem.module.css';

export const CollapsibleMenuItem = ({
	label,
	children,
}: {
	label: string;
	children: ReactNode;
}) => {
	const [open, setOpen] = useState(false);

	return (
		<Collapsible.Root open={open} onOpenChange={setOpen} className={styles['collapsible-menu']}>
			<Collapsible.Trigger asChild>
				<button className={styles['collapsible-trigger']}>
					<span>{label}</span>
					<span className={clsx(open ? 'triangle-up' : 'triangle-down')}></span>
				</button>
			</Collapsible.Trigger>
			<Collapsible.Content className={styles['collapsible-content']}>
				{children}
			</Collapsible.Content>
		</Collapsible.Root>
	);
};
