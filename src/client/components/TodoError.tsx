import React from 'react';
import { useRouteError } from 'react-router-dom';

export const TodoError = () => {
	const error = useRouteError();
	console.error(error);
	// Uncaught ReferenceError: path is not defined
	return <div>Dang!</div>;
};
