import React from 'react';

export const CardSkeleton = () => (
  <div className="card animate-pulse">
    <div className="skeleton h-4 w-24 rounded mb-3" />
    <div className="skeleton h-8 w-32 rounded mb-2" />
    <div className="skeleton h-3 w-20 rounded" />
  </div>
);

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-4 animate-pulse">
        <div className="skeleton h-10 flex-1 rounded" />
        <div className="skeleton h-10 w-24 rounded" />
        <div className="skeleton h-10 w-20 rounded" />
        <div className="skeleton h-10 w-28 rounded" />
      </div>
    ))}
  </div>
);

export const ChartSkeleton = () => (
  <div className="card animate-pulse">
    <div className="skeleton h-4 w-40 rounded mb-4" />
    <div className="skeleton h-64 w-full rounded" />
  </div>
);

export const PageSkeleton = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
    </div>
    <ChartSkeleton />
    <TableSkeleton />
  </div>
);

export default PageSkeleton;
