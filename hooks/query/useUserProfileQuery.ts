import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getUserProfileDetail } from '@/apis/api';
import { UserProfileDetailType } from '@/apis/type';
import { queryKeys } from '@/constants/queryKeys';

const useUserProfileQuery = (options?: UseQueryOptions<UserProfileDetailType>) => {
  const query = useQuery({
    queryKey: [queryKeys.USER_PROFILE_DATA],
    queryFn: () => getUserProfileDetail(),
    ...options,
  });

  const itemCodes = query?.data?.itemCodes || [];
  const cheerCount = query?.data?.cheerCount || 0;

  return {
    ...query,
    data: {
      ...query.data,
      cheerCount: cheerCount,
      itemCodes: itemCodes,
      foodItem: itemCodes?.filter((item: any) => item.includes('A')).join('') || '',
      furnitureItem: itemCodes?.filter((item: any) => item.includes('B')).join('') || '',
      createDate: new Date(query.data?.createdAt || ''),
    },
  };
};
export default useUserProfileQuery;
