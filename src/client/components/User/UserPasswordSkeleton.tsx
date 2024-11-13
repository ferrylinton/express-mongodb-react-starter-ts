import { SkeletonSquare } from '../Skeleton/SkeletonSquare';

export const UserPasswordSkeleton = () => {
	return (
		<div className="container-center">
			<div className="form">
				<SkeletonSquare width={'100%'} height={35} />
				<SkeletonSquare width={'100%'} height={35} />
				<SkeletonSquare width={'100%'} height={35} />
				<div className="form-buttons">
					<SkeletonSquare width={'50%'} height={50} />
					<SkeletonSquare width={'50%'} height={50} />
				</div>
			</div>
		</div>
	);
};
