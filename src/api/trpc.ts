import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../SMS-Tree-BE/src/routers/_app';
import { inferRouterOutputs, inferRouterInputs } from '@trpc/server';
import { TRPCClientError } from '@trpc/client';
import superjson from 'superjson';

import { UserStore } from '../stores/user';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'https://sms-tree-be.onrender.com/trpc',
      headers() {
        const userStore = UserStore();
        return {
          Authorization: userStore.accessToken,
        };
      },
    }),
  ],
  transformer: superjson,
});

export type RouterOutput = inferRouterOutputs<AppRouter>;
export type UserProfileOutput = RouterOutput['user']['profile'];
export type UserStudentListOutput = RouterOutput['user']['studentList'];
export type PaperContentOutput = RouterOutput['paper']['content'];
export type PaperListOutput = RouterOutput['paper']['list'];
export type PaperListOutputItem = RouterOutput['paper']['list'][0];

export type RouterInput = inferRouterInputs<AppRouter>;

export function isTRPCClientError(
  cause: unknown,
): cause is TRPCClientError<AppRouter> {
  return cause instanceof TRPCClientError;
}