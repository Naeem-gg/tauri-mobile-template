import { QueryClientProvider } from '@tanstack/react-query';
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { queryClient } from '@/lib/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Navbar from '@/salah-web-components/Navbar';
import Footer from '@/salah-web-components/Footer';
export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Outlet />
      <Footer />
      <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
  )
}
