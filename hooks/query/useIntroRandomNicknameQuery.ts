import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getRandomNickname } from '@/apis/api';
import { queryKeys } from '@/constants/queryKeys';

const useIntroRandomNicknameQuery = (options?: UseQueryOptions<{ nickname: string }>) => {
  return useQuery({
    queryKey: [queryKeys.INTRO_RANDOM_NICKNAME],
    queryFn: () => getRandomNickname(),
    ...options,
  });
};
export default useIntroRandomNicknameQuery;
