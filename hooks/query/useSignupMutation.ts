import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { postSiginupGithubid } from '@/apis/api';

export const useCheckGithubIdMutation = (options?: UseMutationOptions<any, Error, String>) => {
  return useMutation<any, Error, string>((githubId: string) => postSiginupGithubid(githubId), {
    ...options,
  });
};
