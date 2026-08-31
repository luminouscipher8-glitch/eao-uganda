import { createContext, useContext, useState, ReactNode } from 'react';
import { FullPageLoader } from '../common/Loader.tsx';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  loadingMessage: string;
  setLoadingMessage: (message: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export function LoadingProvider({ children }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(
    "Empowering Uganda's Future Through Education..."
  );

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const value = {
    isLoading,
    setLoading,
    loadingMessage,
    setLoadingMessage,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {isLoading && <FullPageLoader message={loadingMessage} />}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
