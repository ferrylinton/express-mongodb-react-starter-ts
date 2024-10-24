import clsx from 'clsx';

type Props = {
	rotate?: boolean;
};

export const LastIcon = ({ rotate }: Props) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			className={clsx(rotate && 'rotate_180')}
		>
			<path d="M19 12l-18 12v-24l18 12zm4-11h-4v22h4v-22z" />
		</svg>
	);
};
