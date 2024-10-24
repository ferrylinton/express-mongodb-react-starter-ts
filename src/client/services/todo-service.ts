import { AxiosResponse } from 'axios';
import { axiosInstance } from '../utils/axios';

export async function find(): Promise<AxiosResponse<Todo[]>> {
	await new Promise(resolve => setTimeout(resolve, 500));
	return await axiosInstance.get<Todo[]>(`/api/todoes`);
}

export async function findById(id: string) {
	return await axiosInstance.get(`/api/todoes/${id}`);
}

export async function create(task: string) {
	return await axiosInstance.post<Todo>(`/api/todoes`, { task });
}

export async function update(id: string) {
	return await axiosInstance.put<Todo>(`/api/todoes/${id}`);
}

export async function deleteById(id: string) {
	return await axiosInstance.delete<Todo>(`/api/todoes/${id}`);
}
