import { useMutation } from '@tanstack/react-query';
import { IComputer } from '@/types/api/dto/computer';

export const useEstimate = () => {
  return useMutation({
    mutationFn: (computer: IComputer) => {
      return Promise.resolve(computer);
    },
  });
};
