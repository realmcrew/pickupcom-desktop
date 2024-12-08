import { Suspense } from 'react';
import SystemInfo from '@/components/hardware-spec/system-info';
import LoadingScreen from '@/components/common/loading-screen';

export default function Home() {
  return (
    <main>
      <Suspense fallback={<LoadingScreen />}>
        <SystemInfo />
      </Suspense>
    </main>
  );
}
