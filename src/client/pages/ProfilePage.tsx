import { SimpleErrorBoundary } from '../components/SimpleErrorBoundary';

export const Component = () => {
	return (
		<>
			<>Home</>
		</>
	);
};

export function ErrorBoundary() {
	return <SimpleErrorBoundary />;
}

Component.displayName = 'ProfileRoute';
ErrorBoundary.displayName = 'ProfileErrorBoundary';
