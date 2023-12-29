import { Skeleton, SkeletonProps } from "@mui/material";

type TChildrenArgument = React.ReactNode | (() => React.ReactNode);
type TOptions = { isLoading: boolean } & SkeletonProps;

export default function useSkeleton({ isLoading, ...defaultSkeletonProps }: TOptions) {
  const withSkeleton = (
    children: TChildrenArgument,
    count: number = 1,
    overrideSkeletonProps: SkeletonProps = {}
  ) => {
    if (isLoading) {
      return Array.from({ length: count }).map((_, idx) => (
        <Skeleton key={`skeleton-${idx}}`} {...defaultSkeletonProps} {...overrideSkeletonProps} />
      ));
    } else if (typeof children === "function") {
      return children();
    } else {
      return children;
    }
  };

  return withSkeleton;
}
