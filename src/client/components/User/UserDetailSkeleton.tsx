import { FormattedMessage } from 'react-intl';
import styles from '../../assets/css/DataDetail.module.css';
import { Card } from '../Card/Card';
import { SkeletonSquare } from '../Skeleton/SkeletonSquare';

export const UserDetailSkeleton = () => {
	return (
		<>
			<Card title="User's Detail" style={{ maxWidth: 700 }}>
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
				<div className="flex gap-1 mt-3">
					<SkeletonSquare width={100} height={40} />
					<SkeletonSquare width={100} height={40} />
				</div>
			</Card>
		</>
	);
};
