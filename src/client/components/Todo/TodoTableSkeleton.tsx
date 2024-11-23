import { Card } from '../Card/Card';
import { SkeletonSquare } from '../Skeleton/SkeletonSquare';
import styles from './Todo.module.css';

export const TodoTableSkeleton = () => {
	return (
		<Card title="Todo">
			<div className={styles['todo-list-toolbar']}>
				<div className="total">
					<SkeletonSquare width={150} />
				</div>
				<SkeletonSquare width={100} height={40} />
			</div>
			<div className={styles['todo-list']}>
				<table>
					<tbody>
						{['1', '2'].map(num => {
							return (
								<tr key={num}>
									<td>{num}</td>
									<td>
										<SkeletonSquare width={200} />
										<SkeletonSquare width={100} />
									</td>
									<td>
										<div className="flex gap-1 px-1">
											<SkeletonSquare width={45} height={35} />
											<SkeletonSquare width={45} height={35} />
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</Card>
	);
};
