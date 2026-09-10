import { cn } from '../../utils/cn.ts';

interface SkeletonLoaderProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  lines?: number;
  animation?: 'pulse' | 'wave' | 'none';
}

export default function SkeletonLoader({
  className = '',
  variant = 'text',
  width,
  height,
  lines = 1,
  animation = 'pulse',
}: SkeletonLoaderProps) {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700';

  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-lg',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height)
    style.height = typeof height === 'number' ? `${height}px` : height;

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    animationClasses[animation],
    className
  );

  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseClasses,
              variantClasses[variant],
              animationClasses[animation],
              index === lines - 1 ? 'w-3/4' : 'w-full'
            )}
            style={style}
          />
        ))}
      </div>
    );
  }

  return <div className={classes} style={style} />;
}

// Card skeleton component
export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={cn('bg-white rounded-lg shadow-md p-6 space-y-4', className)}
    >
      <SkeletonLoader variant="circular" width={60} height={60} />
      <div className="space-y-2">
        <SkeletonLoader variant="text" height={20} />
        <SkeletonLoader variant="text" lines={2} />
      </div>
    </div>
  );
}

// List skeleton component
export function ListSkeleton({
  items = 3,
  className = '',
}: {
  items?: number;
  className?: string;
}) {
  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4">
          <SkeletonLoader variant="circular" width={40} height={40} />
          <div className="flex-1 space-y-2">
            <SkeletonLoader variant="text" height={16} />
            <SkeletonLoader variant="text" height={14} width="60%" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Table skeleton component
export function TableSkeleton({
  rows = 5,
  columns = 4,
  className = '',
}: {
  rows?: number;
  columns?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-gray-200',
        className
      )}
    >
      <div className="bg-gray-50 px-6 py-3">
        <SkeletonLoader variant="text" height={20} />
      </div>
      <div className="divide-y divide-gray-200">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="px-6 py-4">
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <SkeletonLoader
                  key={colIndex}
                  variant="text"
                  height={16}
                  width={colIndex === 0 ? '80%' : '60%'}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
