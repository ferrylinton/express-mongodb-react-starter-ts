import { createBrowserRouter, createRoutesFromElements, Route, Routes } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import Layout from './Layout/Layout';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter([
	{
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				element: <ProtectedRoute />,
				children: [
					{
						path: '/',
						lazy: () => import('../pages/HomePage'),
					},
					{
						path: '/profile',
						lazy: () => import('../pages/ProfilePage'),
					},
					{
						path: '/changepassword',
						lazy: () => import('../pages/ChangePassword'),
					},
					{
						path: '/todo',
						lazy: () => import('../pages/Todo/TodoListPage'),
					},
					{
						path: '/todo/create',
						lazy: () => import('../pages/Todo/TodoCreatePage'),
					},
					{
						path: '/todo/detail/:id',
						lazy: () => import('../pages/Todo/TodoDetailPage'),
					},
				],
			},
			{
				path: '/login',
				lazy: () => import('../pages/LoginPage'),
			},
			{
				path: '/register',
				lazy: () => import('../pages/RegisterPage'),
			},
			{
				path: '/forgotpassword',
				lazy: () => import('../pages/ForgotPasswordPage'),
			},
			{
				path: '*',
				element: <NotFoundPage />,
			},
		],
	},
]);
