// 'use client';
// import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
// import { useState } from 'react';

// export default function TanStackProvider({ children }: { children: React.ReactNode }) {
//   const [client] = useState(() => new QueryClient());
//   return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
// }

'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface TanStackProviderProps {
  children: React.ReactNode;
}

const TanStackProvider = ({ children }: TanStackProviderProps) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default TanStackProvider;
