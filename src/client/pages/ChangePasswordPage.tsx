import { SimpleErrorBoundary } from '../components/SimpleErrorBoundary';
import { UserPasswordForm } from '../components/User/UserPasswordForm';

export const Component = () => {
	return <UserPasswordForm />;
};

export function ErrorBoundary() {
	return <SimpleErrorBoundary />;
}

Component.displayName = 'ChangePasswordRoute';
ErrorBoundary.displayName = 'ChangePasswordErrorBoundary';
