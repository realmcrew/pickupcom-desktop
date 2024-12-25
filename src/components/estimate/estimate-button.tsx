import { Button, ButtonProps } from '@/components/ui/button';
import { useEstimate } from '@/hooks/use-estimate';
import { usePcId } from '@/hooks/use-pc-id';

type Props = {
  // className?: string;
} & ButtonProps;

export default function EstimateButton(props: Props) {
  const pcIdQuery = usePcId();
  const { mutate, isSuccess, isPending } = useEstimate();

  const handleSubmit = (pcId: string) => mutate({ pcId });

  if (isSuccess) {
    // Feedback UI
  }

  return (
    <Button {...props} disabled={isPending} size="lg" type="button" onClick={() => handleSubmit(pcIdQuery.data)}>
      견적 확인 & 즉시 판매
    </Button>
  );
}
