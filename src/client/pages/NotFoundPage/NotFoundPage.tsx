import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';
import { FormattedMessage } from 'react-intl';

export const NotFoundPage = () => {
	return (
		<div className={styles['not-found-page']}>
			<h1>404</h1>
			<h2>Page Not Found</h2>
			<Link to="/home">
				<FormattedMessage id="home" />
			</Link>
		</div>
	);
};
