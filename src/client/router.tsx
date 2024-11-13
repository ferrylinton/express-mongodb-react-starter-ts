import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import ErrorPage from './pages/ErrorPage';
import { NotFoundPage } from './pages/NotFoundPage';

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
						lazy: () => import('./pages/HomePage'),
					},
					{
						path: '/profile',
						lazy: () => import('./pages/ProfilePage'),
					},
					{
						path: '/changepassword',
						lazy: () => import('./pages/ChangePassword'),
					},
					{
						path: '/user',
						lazy: () => import('./pages/User/UserListPage'),
					},
					{
						path: '/user/create',
						lazy: () => import('./pages/User/UserCreatePage'),
					},
					{
						path: '/user/modify/:id',
						lazy: () => import('./pages/User/UserModifyPage'),
					},
					{
						path: '/user/detail/:id',
						lazy: () => import('./pages/User/UserDetailPage'),
					},
					{
						path: '/user/password/:id',
						lazy: () => import('./pages/User/UserPasswordPage'),
					},
					{
						path: '/todo',
						lazy: () => import('./pages/Todo/TodoListPage'),
					},
					{
						path: '/todo/create',
						lazy: () => import('./pages/Todo/TodoCreatePage'),
					},
					{
						path: '/todo/detail/:id',
						lazy: () => import('./pages/Todo/TodoDetailPage'),
					},
				],
			},
			{
				path: '/login',
				lazy: () => import('./pages/LoginPage'),
			},
			{
				path: '/register',
				lazy: () => import('./pages/RegisterPage'),
			},
			{
				path: '/forgotpassword',
				lazy: () => import('./pages/ForgotPasswordPage'),
			},
			{
				path: '*',
				element: <NotFoundPage />,
			},
		],
	},
]);
