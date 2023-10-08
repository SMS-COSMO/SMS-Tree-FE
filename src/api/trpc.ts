import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../SMS-Tree-BE/src/routers/_app';
import { TRPCClientError } from '@trpc/client';
import superjson from 'superjson';

import { UserStore } from '../stores/user';
import { inferRouterOutputs } from '@trpc/server';
const userStore = UserStore();

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'https://sms-tree-be.onrender.com/trpc',
      headers() {
        return {
          Authorization: userStore.accessToken,
        };
      },
    }),
  ],
  transformer: superjson,
});

export type RouterOutput = inferRouterOutputs<AppRouter>;

export function isTRPCClientError(
  cause: unknown,
): cause is TRPCClientError<AppRouter> {
  return cause instanceof TRPCClientError;
}