import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getFootprint } from '@/apis/api';
import { UserProfileType } from '@/apis/type';
import { queryKeys } from '@/constants/queryKeys';

const useUserFootprintQuery = (
  year: string,
  month: string,
  options?: UseQueryOptions<UserProfileType>
) => {
  return useQuery({
    queryKey: [queryKeys.USER_FOOTPRINT_DATA],
    queryFn: () => getFootprint(year, month),
    ...options,
  });
};
export default useUserFootprintQuery;
