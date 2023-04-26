import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getShare } from '@/apis/api';
import { ShareUserDataType } from '@/apis/type';
import { queryKeys } from '@/constants/queryKeys';

const useUserShareQuery = (githubId: string, options?: UseQueryOptions<ShareUserDataType>) => {
  const query = useQuery({
    queryKey: [queryKeys.USER_SHARE_DATA],
    queryFn: () => getShare(githubId),
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

export default useUserShareQuery;
