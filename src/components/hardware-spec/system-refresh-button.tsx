import { Button, ButtonProps } from '@/components/ui/button';

type Props = ButtonProps & { className?: string };

export default function SystemRefreshButton(props: Props) {
  const handleErrorTest = () => {
    throw new Error('Sentry test error.');
  };

  return (
    <Button type="button" variant="outline" size="lg" {...props} onClick={handleErrorTest}>
      컴퓨터 정보 새로고침
    </Button>
  );
}
