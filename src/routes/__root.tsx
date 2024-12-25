import Navbar from '@/components/common/navbar';
import { IS_PRODUCTION } from '@/shared/helpers/is-production';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { NuqsAdapter } from 'nuqs/adapters/react';

export const Route = createRootRoute({
  component: () => (
    <NuqsAdapter>
      <div className="mx-auto container w-full h-full py-4 md:py-6">
        <Navbar />
        <Outlet />
        {!IS_PRODUCTION && <TanStackRouterDevtools />}
      </div>
    </NuqsAdapter>
  ),
});
