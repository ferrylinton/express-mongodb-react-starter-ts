import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { axiosInstance } from '../utils/axios';

export const createTodoActionxx = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const payload = Object.fromEntries(formData.entries());
	await axiosInstance.post<Todo>(`/api/todoes`, payload);

	return redirect('/');
};
