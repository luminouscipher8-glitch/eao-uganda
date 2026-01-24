import React, { Suspense } from 'react';
import { useLoading } from '../providers/LoadingProvider';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function SuspenseWrapper({ children, fallback }: Props) {
  const { loadingMessage } = useLoading();

  return (
    <Suspense
      fallback={
        fallback || (
          <div className="min-h-[200px] flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
              <p className="text-gray-600 text-sm">{loadingMessage}</p>
            </div>
          </div>
        )
      }
    >
      {children}
    </Suspense>
  );
}
