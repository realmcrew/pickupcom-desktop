import { Button, ButtonProps } from '@/components/ui/button';
import { useEstimate } from '@/hooks/use-estimate';
import { usePcIdentifier } from '@/hooks/use-pc-id';

type Props = ButtonProps;

export default function EstimateButton(props: Props) {
  const pcIdentifierQuery = usePcIdentifier();
  const { mutate, isSuccess, isPending } = useEstimate();

  const handleSubmit = (pcIdentifier: string) => mutate({ pcIdentifier });

  if (isSuccess) {
    // Feedback UI
  }

  return (
    <Button
      {...props}
      disabled={isPending}
      size="lg"
      type="button"
      onClick={() => handleSubmit(pcIdentifierQuery.data)}
    >
      견적 확인 & 즉시 판매
    </Button>
  );
}
