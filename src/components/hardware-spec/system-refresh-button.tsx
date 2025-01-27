import { Button, ButtonProps } from '@/components/ui/button';

type Props = ButtonProps & { className?: string };

export default function SystemRefreshButton(props: Props) {
  return (
    <Button type="button" variant="outline" size="lg" {...props}>
      컴퓨터 정보 새로고침
    </Button>
  );
}
