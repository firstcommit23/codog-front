import styled from '@emotion/styled';
import moment from 'moment';
import { button } from '@/styles/common';
import useUserFootprintQuery from '@/hooks/query/useUserFootprintQuery';
import useInfiniteCommentsQuery from '@/hooks/query/useInfiniteCommentsQuery';
import { CommentType } from '@/apis/type';

const CommentList = () => {
  const COUNT = 3;
  const { data: footprintData } = useUserFootprintQuery('2022', '12');

  const { data, fetchNextPage, isSuccess, hasNextPage, isFetchingNextPage } =
    useInfiniteCommentsQuery(footprintData?.footprintId || 0, COUNT, {
      enabled: !!footprintData?.footprintId,
    });

  const handleLoadMore = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  const items = data?.pages?.flatMap((page) => page) ?? [];

  return (
    <CommentListContainer>
      {items ? (
        <>
          {items.map((item: CommentType) => {
            return (
              <CommentItemWapper key={item.id}>
                <CommentFirstLine>
                  <CommentWriterArea>
                    <img src="/images/profileIcon.svg" />
                    <CommentWriterNickname>{item.nickname}</CommentWriterNickname>
                    <div>🗑</div>
                  </CommentWriterArea>
                  <CommentWriteDate>
                    {moment(item.created_at).format('YYYY-MM-DD HH:mm:ss')}
                  </CommentWriteDate>
                </CommentFirstLine>
                <CommentText>{item.contents}</CommentText>
              </CommentItemWapper>
            );
          })}
          {hasNextPage && (
            <div>
              <MoreCommentButton onClick={handleLoadMore}>코멘트 더보기</MoreCommentButton>
            </div>
          )}
        </>
      ) : (
        <CommentItemWapper>
          <div style={{ padding: '2rem', fontSize: '1.4rem' }}>등록된 코멘트가 없습니다.</div>
        </CommentItemWapper>
      )}
    </CommentListContainer>
  );
};

const CommentListContainer = styled.div``;
const CommentItemWapper = styled.div`
  background-color: #f5f5f5;
  border-radius: 1rem;
  margin: 1rem 0;
`;

const CommentFirstLine = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 2.5rem;
  padding: 1.3rem 2rem;
`;

const CommentWriterArea = styled.div`
  display: flex;
  gap: 0.3rem;
`;

const CommentWriterNickname = styled.div`
  font-size: 1.4rem;
  color: #282828;
`;

const CommentText = styled.div`
  padding: 0 2rem 2rem 2rem;
  font-size: 1.2rem;
  color: #282828;
  line-height: 1.8rem;
`;

const CommentWriteDate = styled.div`
  color: #868686;
`;

const MoreCommentButton = styled.button`
  ${button}
  background-color: white;
  border: 1px solid #cbcbcb;
  color: #6d6d6d;
  margin-top: 0;
`;

export default CommentList;
