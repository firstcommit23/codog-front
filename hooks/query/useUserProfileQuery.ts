import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getUserProfile } from '@/apis/api';
import { UserProfileType } from '@/apis/type';
import { queryKeys } from '@/constants/queryKeys';

const useUserProfileQuery = (options?: UseQueryOptions<UserProfileType>) => {
  const query = useQuery({
    queryKey: [queryKeys.USER_PROFILE_DATA],
    queryFn: () => getUserProfile(),
    ...options,
  });

  const itemCodes =
    query?.data?.itemCodes && typeof query?.data?.itemCodes === 'string'
      ? JSON.parse(query.data.itemCodes)[0]
      : [];

  return {
    ...query,
    data: {
      ...query.data,
      itemCodes: itemCodes,
      foodItem: itemCodes?.filter((item: any) => item.includes('A')).join('') || '',
      furnitureItem: itemCodes?.filter((item: any) => item.includes('B')).join('') || '',
      createDate: new Date(query.data?.createdAt || ''),
    },
  };
};
export default useUserProfileQuery;
