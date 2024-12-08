import { Button } from '@/components/ui/button';

type Props = {
  handleRetry: () => void;
};

export default function RetryScreen({ handleRetry }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">오류가 발생했습니다</h1>
      <h2 className="text-xl text-gray-600">페이지를 다시 로드해주세요</h2>
      <Button onClick={handleRetry}>다시 시도하기</Button>
    </div>
  );
}
