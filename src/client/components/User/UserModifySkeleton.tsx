import { SkeletonSquare } from '../Skeleton/SkeletonSquare';

export const UserModifySkeleton = () => {
	return (
		<div className="container-center">
			<div className="form">
				<SkeletonSquare width={'100%'} height={35} />
				<SkeletonSquare width={'100%'} height={35} />
				<SkeletonSquare width={'100%'} height={35} />
				<div className="grid grid-cols-2 gap-1">
					<SkeletonSquare width={'100%'} height={50} />
					<SkeletonSquare width={'100%'} height={50} />
				</div>
			</div>
		</div>
	);
};
