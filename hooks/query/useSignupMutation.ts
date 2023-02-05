import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import type { User } from '@/apis/type';
import {
  postSiginupGithubid,
  postSighupNickname,
  postSighupUser,
  postAuthorizationMail,
} from '@/apis/api';

export const useCheckGithubIdMutation = (options?: UseMutationOptions<any, Error, String>) => {
  return useMutation<any, Error, string>((githubId: string) => postSiginupGithubid(githubId), {
    ...options,
  });
};

export const useSighupNickname = (options?: UseMutationOptions<any, Error, User>) => {
  return useMutation<any, Error, User>((user: User) => postSighupNickname(user), {
    ...options,
  });
};

export const useCheckMutation = (options?: UseMutationOptions<any, Error, String>) => {
  return useMutation<any, Error, string>((githubId: string) => postSiginupGithubid(githubId), {
    ...options,
  });
};

export const useSighupUserMutation = (options?: UseMutationOptions<any, Error, User>) => {
  return useMutation<any, Error, User>((user: User) => postSighupUser(user), {
    ...options,
  });
};

export const useAuthorizationMailMutation = (options?: UseMutationOptions<any, Error, string>) => {
  return useMutation<any, Error, string>((email: string) => postAuthorizationMail(email), {
    ...options,
  });
};
