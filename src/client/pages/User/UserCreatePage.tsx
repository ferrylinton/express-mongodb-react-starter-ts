import { UserCreateForm } from '../../components/User/UserCreateForm';
import { SimpleErrorBoundary } from '../../components/SimpleErrorBoundary';

export const Component = () => {
	return (
		<>
			<UserCreateForm />
		</>
	);
};

export function ErrorBoundary() {
	return <SimpleErrorBoundary />;
}

Component.displayName = 'UserCreateRoute';
ErrorBoundary.displayName = 'UserCreateErrorBoundary';
