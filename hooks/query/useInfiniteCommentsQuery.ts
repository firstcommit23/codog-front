import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { getComments } from '@/apis/api';
import type { CommentResponse } from '@/apis/type';
import moment from 'moment';

const useInfiniteCommentsQuery = (
  footprintId: number,
  count: number = 3,
  options?: UseInfiniteQueryOptions<CommentResponse>
) => {
  const query = useInfiniteQuery({
    queryKey: [queryKeys.GET_COMMENT_LIST],
    queryFn: ({ pageParam = { cursor_comment_id: 0, cursor_created_at: '' } }) =>
      getComments({
        footprintId,
        count,
        id: pageParam.cursor_comment_id,
        created_at: pageParam.cursor_created_at,
      }),
    ...options,
    retry: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.comments[lastPage.comments.length - 1]
        ? {
            cursor_comment_id: lastPage.comments[lastPage.comments.length - 1].id,
            cursor_created_at: moment(
              lastPage.comments[lastPage.comments.length - 1].createdAt
            ).format('YYYY-MM-DD HH:mm:ss'),
          }
        : false;
    },
  });

  return query;
};

export default useInfiniteCommentsQuery;
