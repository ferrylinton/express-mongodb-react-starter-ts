import { AxiosResponse } from 'axios';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import styles from './Todo.module.css';
import { TodoItem } from './TodoItem';

export type LoaderData = {
	response: AxiosResponse<Todo[]>;
};

export const TodoTable = ({ response }: LoaderData) => {
	const navigate = useNavigate();

	const todoes = response.data as Todo[];

	const total = todoes.length;

	return (
		<Card title="Todo">
			<div className={styles['todo-list-toolbar']}>
				<div className="total">
					<FormattedMessage id="total" values={{ total }} />
				</div>
				<Button minWidth={100} variant="primary" onClick={() => navigate('/todo/create')}>
					<FormattedMessage id="create" />
				</Button>
			</div>
			<div className={styles['todo-list']}>
				<table>
					<tbody>
						{todoes.map((todo, index) => {
							return <TodoItem key={index} index={index} todo={todo} />;
						})}
					</tbody>
				</table>
			</div>
		</Card>
	);
};
