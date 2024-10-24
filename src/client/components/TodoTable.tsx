import { AxiosResponse } from 'axios';
import React from 'react'
import { TodoItem } from './TodoItem';

export type LoaderData = {
	response: AxiosResponse<Todo[]>;
}

export const TodoTable = ({ response }: LoaderData) => {
	return (
		<div className="todo-list">
			<table>
				<tbody>
					{
						response.data && (response.data as Todo[]).map((todo, index) => {
							return <TodoItem
								key={index}
								index={index}
								todo={todo}
							/>
						})
					}
				</tbody>
			</table>
		</div>
	)
}
