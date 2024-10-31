import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';
import { useConfirmStore } from '../hooks/confirm-store';

export const ConfirmDialog = () => {
	const { message, show, hideConfirm, okHandler } = useConfirmStore();

	return (
		<div className={clsx('confirm', show && 'show')}>
			<div className="confirm-content">
				<p>{message}</p>
				<section>
					<button className="btn btn-secondary" onClick={() => hideConfirm()}>
						<FormattedMessage id="cancel" />
					</button>
					<button className="btn btn-primary" onClick={async () => await okHandler()}>
						<FormattedMessage id="ok" />
					</button>
				</section>
			</div>
		</div>
	);
};
