import { QueryClientProvider } from '@tanstack/react-query';
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { queryClient } from '@/lib/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
  )
}
