import { IComputer } from '@/types/api/dto/computer';
import { Button } from '@/components/ui/button';
import { useEstimate } from '@/hooks/use-estimate';

type Props = { computer: IComputer };

export default function EstimateButton({ computer }: Props) {
  const { mutate, isSuccess, isPending } = useEstimate();

  const handleSubmit = () => {
    mutate(computer);
  };

  if (isSuccess) {
    // Change UI
  }

  return (
    <Button disabled={isPending} size="lg" type="button" onClick={handleSubmit}>
      견적 확인 & 즉시 판매
    </Button>
  );
}
