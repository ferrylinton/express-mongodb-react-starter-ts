import * as Collapsible from '@radix-ui/react-collapsible';
import clsx from 'clsx';
import { ReactNode, useState } from 'react';

type Props = {
	label: string;
	children: ReactNode;
};

export const CollapsibleMenuItem = ({ label, children }: Props) => {
	const [open, setOpen] = useState(false);

	return (
		<Collapsible.Root open={open} onOpenChange={setOpen} className="collapsible-menu">
			<Collapsible.Trigger asChild>
				<button className="collapsible-trigger">
					<span>{label}</span>
					<span className={clsx(open ? 'triangle-up' : 'triangle-down')}></span>
				</button>
			</Collapsible.Trigger>
			<Collapsible.Content className="collapsible-content">{children}</Collapsible.Content>
		</Collapsible.Root>
	);
};
