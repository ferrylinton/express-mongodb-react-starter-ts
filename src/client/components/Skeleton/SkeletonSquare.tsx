import styles from './Skeleton.module.css';

type SkeletonSquareProps = {
	width?: number;
	height?: number;
};

export const SkeletonSquare = ({ height = 20, width = 60 }: SkeletonSquareProps) => {
	return <div className={styles['skeleton-square']} style={{ width, height }}></div>;
};
