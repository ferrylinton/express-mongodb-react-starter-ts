import * as Popover from '@radix-ui/react-popover';
import { FormattedMessage } from 'react-intl';
import CloseIcon from '../../icons/CloseIcon';
import { DotMenuIcon } from '../../icons/DotMenuIcon';
import styles from './UserPopMenu.module.css';

type Props = {
	locked: boolean;
	toDetail: () => void;
	toModify: () => void;
	toPassword: () => void;
	toggleLockUser: () => void;
};

export const UserPopMenu = ({ locked, toDetail, toModify, toPassword, toggleLockUser }: Props) => {
	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<button className={styles['dot-menu']} aria-label="User Pop Menu">
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
						<button onClick={() => toDetail()}>
							<FormattedMessage id="detail" />
						</button>
						<button onClick={() => toModify()}>
							<FormattedMessage id="modify" />
						</button>
						<button onClick={() => toPassword()}>
							<FormattedMessage id="password" />
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
