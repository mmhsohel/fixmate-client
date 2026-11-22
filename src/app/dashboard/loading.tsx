import { Skeleton, TableSkeleton } from '@/components/ui';

export default function Loading() {
  return <div><Skeleton className="mb-6 h-9 w-56" /><TableSkeleton /></div>;
}
