import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

type Props = {
  className?: string;
  iconClassName?: string;
};

export default function LoadingScreen({ className, iconClassName }: Props) {
  return (
    <div className={cn('flex h-screen items-center justify-center', className)}>
      <Loader2 className={cn('animate-spin', iconClassName)} />
    </div>
  );
}
