import { SimpleErrorBoundary } from '../components/SimpleErrorBoundary';
import { WelcomeMessage } from '../components/WelcomeMessage/WelcomeMessage';

export const Component = () => {
	return <WelcomeMessage />;
};

export function ErrorBoundary() {
	return <SimpleErrorBoundary />;
}

Component.displayName = 'HomeRoute';
ErrorBoundary.displayName = 'HomeErrorBoundary';
