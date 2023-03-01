import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getUserProfile } from '@/apis/api';
import { UserProfileType } from '@/apis/type';
import { queryKeys } from '@/constants/queryKeys';

const useUserProfileQuery = (options?: UseQueryOptions<UserProfileType>) => {
  return useQuery({
    queryKey: [queryKeys.USER_PROFILE_DATA],
    queryFn: () => getUserProfile(),
    ...options,
  });
};
export default useUserProfileQuery;
