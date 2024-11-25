import { useRouteError } from 'react-router-dom';
import styles from './ErrorPage.module.css';

export default function ErrorPage() {
	const error: any = useRouteError();
	console.error(error);

	return (
		<div className={styles['error-page']}>
			<div className="container">
				<h1>Error</h1>
				<h2>{error.status || 500}</h2>
				<code>
					{error?.error?.message || error?.message || 'Unexpected error has occurred'}
				</code>
			</div>
		</div>
	);
}
