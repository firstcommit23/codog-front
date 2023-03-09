import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { getTotalItems } from '@/apis/api';
import { ItemType } from '@/apis/type';

const useItemListQuery = (options?: UseQueryOptions<ItemType[]>) => {
  return useQuery({
    queryKey: [queryKeys.TOTAL_ITEM_DATA],
    queryFn: () => getTotalItems(),
    ...options,
  });
};

export default useItemListQuery;
