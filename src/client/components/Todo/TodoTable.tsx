import { AxiosResponse } from 'axios';
import { TodoItem } from './TodoItem';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

export type LoaderData = {
	response: AxiosResponse<Todo[]>;
};

export const TodoTable = ({ response }: LoaderData) => {
	const todoes = response.data as Todo[];

	const total = todoes.length;

	return (
		<>
			<div className="todo-list-toolbar">
				<div className="total">
					<FormattedMessage id="total" values={{ total }} />
				</div>
				<Link to={'/todo/create'} className="btn btn-primary">
					<FormattedMessage id="newTask" />
				</Link>
			</div>
			<div className="todo-list">
				<table>
					<tbody>
						{todoes.map((todo, index) => {
							return <TodoItem key={index} index={index} todo={todo} />;
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};
