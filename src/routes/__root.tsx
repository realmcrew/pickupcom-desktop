import Navbar from '@/components/common/navbar';
import { IS_PRODUCTION } from '@/shared/helpers/is-production';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <div className="mx-auto container w-full h-full py-4 md:py-6">
      <Navbar />
      <Outlet />
      {!IS_PRODUCTION && <TanStackRouterDevtools />}
    </div>
  ),
});
