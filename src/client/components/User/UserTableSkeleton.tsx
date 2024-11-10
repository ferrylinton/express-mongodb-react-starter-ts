import { FormattedMessage } from "react-intl";

export const UserTableSkeleton = () => {
	return (
		<div className="data-list">
			<div className='table-data'>
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th><FormattedMessage id="username" /></th>
							<th><FormattedMessage id="email" /></th>
							<th><FormattedMessage id="createdAt" /></th>
						</tr>
					</thead>
					<tbody>
						{['1', '2'].map(num => {
							return (
								<tr key={num}>
									<td>{num}</td>
									<td>
										<div className="skeleton-square" style={{ height: 20, width: 130 }}></div>
									</td>
									<td>
										<div className="skeleton-square" style={{ height: 20, width: 130 }}></div>
									</td>
									<td>
										<div className="skeleton-square" style={{ height: 20, width: 60 }}></div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};
