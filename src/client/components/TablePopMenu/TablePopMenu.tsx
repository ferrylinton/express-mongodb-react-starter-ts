import React from 'react';
import * as Popover from "@radix-ui/react-popover";
import CloseIcon from '../../icons/CloseIcon';
import { CheckIcon } from '../../icons/CheckIcon';
import { Link } from 'react-router-dom';
import EyeIcon from '../../icons/EyeIcon';
import { DotMenuIcon } from '../../icons/DotMenuIcon';
import styles from "./TablePopMenu.module.css";
import { FormattedMessage } from 'react-intl';

type Props = {
	detail: string
}

export const TablePopMenu = ({ detail }: Props) => {
	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<button className={styles["dot-menu"]} aria-label="Update dimensions">
					<DotMenuIcon />
				</button>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content className={styles["table-pop-menu"]} sideOffset={-3} side='left' align='start'>
					<section>
						<button>
							<FormattedMessage id="lock" />
						</button>
						<Link to={detail}>
							<FormattedMessage id="detail" />
						</Link>
					</section>
					<Popover.Close className={styles["popover-close"]} aria-label="Close">
						<CloseIcon />
					</Popover.Close>
					<Popover.Arrow className={styles["popover-arrow"]} />
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	)
}
