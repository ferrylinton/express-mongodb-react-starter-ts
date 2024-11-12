import * as Popover from '@radix-ui/react-popover';
import { FormattedMessage } from 'react-intl';
import CloseIcon from '../../icons/CloseIcon';
import { DotMenuIcon } from '../../icons/DotMenuIcon';
import styles from './TablePopMenu.module.css';

type Props = {
	locked: boolean;
	goToDetail: () => void;
	toggleLockUser: () => void;
};

export const TablePopMenu = ({ locked, goToDetail, toggleLockUser }: Props) => {
	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<button className={styles['dot-menu']} aria-label="Update dimensions">
					<DotMenuIcon />
				</button>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content
					className={styles['table-pop-menu']}
					sideOffset={-3}
					side="left"
					align="start"
				>
					<section>
						<button onClick={() => toggleLockUser()}>
							<FormattedMessage id={locked ? 'unlock' : 'lock'} />
						</button>
						<button onClick={() => goToDetail()}>
							<FormattedMessage id="detail" />
						</button>
					</section>
					<Popover.Close className={styles['popover-close']} aria-label="Close">
						<CloseIcon />
					</Popover.Close>
					<Popover.Arrow className={styles['popover-arrow']} />
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
};
