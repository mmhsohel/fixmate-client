import { CardGridSkeleton, Skeleton } from '@/components/ui';

export default function Loading() {
  return (
    <div className="container-x py-12">
      <Skeleton className="mb-3 h-10 w-72" /><Skeleton className="mb-10 h-5 w-96 max-w-full" />
      <CardGridSkeleton />
    </div>
  );
}
