import { IS_PRODUCTION } from '@/shared/helpers/is-production';
import { Computer } from '@/types/api/dto/computer';

type Props = {
  computer: Computer;
};

export default function DebugPanel({ computer }: Props) {
  if (IS_PRODUCTION) {
    return null;
  }

  return (
    <section>
      <h3>Your system info</h3>
      <p className="text-red-500">{`${JSON.stringify(computer, null, 4)}`}</p>
    </section>
  );
}
