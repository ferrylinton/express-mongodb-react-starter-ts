import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import Layout from './Layout';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />} errorElement={<ErrorPage />}>

			<Route
				index
				lazy={() => import("../pages/HomePage")} />

			<Route
				path="/detail/:id"
				lazy={() => import("../pages/DetailPage")} />

			<Route
				path="/add"
				lazy={() => import("../pages/AddFormPage")} />

			<Route path="*" element={<NotFoundPage />} />

		</Route>
	)
)
