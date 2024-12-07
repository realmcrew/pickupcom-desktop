import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

function Navbar() {
  return (
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>
    </div>
  );
}

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
