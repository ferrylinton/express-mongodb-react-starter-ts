import { FormattedMessage } from 'react-intl';
import styles from '../../assets/css/DataDetail.module.css';
import { SkeletonSquare } from '../Skeleton/SkeletonSquare';

export const ProfileSkeleton = () => {
	return (
		<>
			<div className={styles['data-detail']}>
				<table>
					<tbody>
						<tr>
							<th>
								<FormattedMessage id="id" />
							</th>
							<td>
								<SkeletonSquare width={200} />
							</td>
						</tr>
						<tr>
							<th>
								<FormattedMessage id="email" />
							</th>
							<td>
								<SkeletonSquare width={200} />
							</td>
						</tr>
						<tr>
							<th>
								<FormattedMessage id="username" />
							</th>
							<td>
								<SkeletonSquare width={200} />
							</td>
						</tr>
						<tr>
							<th>
								<FormattedMessage id="locked" />
							</th>
							<td>
								<SkeletonSquare width={200} />
							</td>
						</tr>
						<tr>
							<th>
								<FormattedMessage id="createdAt" />
							</th>
							<td>
								<SkeletonSquare width={200} />
							</td>
						</tr>
						<tr>
							<th>
								<FormattedMessage id="updatedAt" />
							</th>
							<td>
								<SkeletonSquare width={200} />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
};
