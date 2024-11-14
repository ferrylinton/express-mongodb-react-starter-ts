import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useAppContext } from '../../providers/app-provider';
import styles from './WelcomeMessage.module.css';

export const WelcomeMessage = () => {
	const { loggedUser } = useAppContext();

	return (
		<div className={styles['welcome-message']}>
			<h2>
				<FormattedMessage
					id="welcome.hi"
					values={{
						username: loggedUser?.username,
						strong: chunks => <strong>{chunks}</strong>,
					}}
				/>
			</h2>
			<h1>
				<FormattedMessage
					id="welcome.message"
					values={{
						strong: chunks => <strong>{chunks}</strong>,
					}}
				/>
			</h1>
		</div>
	);
};
