import React from 'react';
import ReactDOM from 'react-dom/client';
import QueryProvider from '@/lib/react-query/query-provider';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import './global.css';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <QueryProvider>
        <RouterProvider router={router} />
        <Toaster richColors toastOptions={{}} />
      </QueryProvider>
    </React.StrictMode>,
  );
}
