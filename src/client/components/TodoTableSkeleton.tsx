export const TodoTableSkeleton = () => {
	return (
		<div className="todo-list">
			<table>
				<tbody>
					{['1', '2'].map(num => {
						return (
							<tr key={num}>
								<td>{num}</td>
								<td>
									<span className="skeleton-line"></span>
									<em className="skeleton-line" style={{ width: 100 }}></em>
								</td>
								<td>
									<div className="action">
										<div className="skeleton-square"></div>
										<div className="skeleton-square"></div>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
