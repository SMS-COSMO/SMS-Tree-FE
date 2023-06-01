import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../SMS-Tree-BE/src/routers/_app';
import superjson from 'superjson';

// Notice the <AppRouter> generic here.
export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'https://sms-tree-backend-raimoethedev.koyeb.app/trpc',
    }),
  ],
  transformer: superjson,
});