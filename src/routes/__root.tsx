import Navbar from '@/components/common/navbar';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <div className="mx-auto container w-full h-full py-4 md:py-6">
      <Navbar />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
