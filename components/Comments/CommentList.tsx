import styled from '@emotion/styled';
import moment from 'moment';
import { button } from '@/styles/common';
import useInfiniteCommentsQuery from '@/hooks/query/useInfiniteCommentsQuery';
import { CommentType } from '@/apis/type';

const CommentList = ({ footprintId }: { footprintId: number }) => {
  const COUNT = 3;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteCommentsQuery(
    footprintId || 0,
    COUNT,
    {
      enabled: !!footprintId,
    }
  );

  const handleLoadMore = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  const items = data?.pages?.flatMap((page) => page.comments) ?? [];
  const totalCount = data?.pages[data?.pages.length - 1].totalCount || 0;

  return (
    <CommentListContainer>
      {items && items.length > 0 ? (
        <>
          {items.map((item: CommentType) => {
            return (
              <CommentItemWapper key={item.id}>
                <CommentFirstLine>
                  <CommentWriterArea>
                    <img src="/images/profileIcon.svg" />
                    <CommentWriterNickname>{item.nickname}</CommentWriterNickname>
                  </CommentWriterArea>
                  <CommentWriteDate>
                    {moment(item.created_at).format('YYYY-MM-DD HH:mm:ss')}
                  </CommentWriteDate>
                </CommentFirstLine>
                <CommentText>{item.contents}</CommentText>
                <DeleteBtn></DeleteBtn>
              </CommentItemWapper>
            );
          })}
          {totalCount > items.length && (
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
  margin-bottom: 1.5rem;
  position: relative;
`;

const CommentFirstLine = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 2.5rem;
  padding: 1.3rem 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`;

const CommentWriterArea = styled.div`
  display: flex;
  gap: 0.3rem;

  img {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const CommentWriterNickname = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #666666;
  margin-left: 0.5rem;
`;

const CommentText = styled.div`
  padding: 2rem 4rem 3rem 2.5rem;
  font-size: 1.6rem;
  line-height: 1.8;
  word-break: keep-all;
  color: #333333;
`;

const DeleteBtn = styled.button`
  background: url('/images/icon/trash.svg') no-repeat;
  background-position: 50% 50%;
  background-size: 1.6rem 1.6rem;
  border: none;
  width: 3rem;
  height: 3rem;
  border-radius: 20rem;

  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;

  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    transition: all ease 0.3s;
  }
`;

const CommentWriteDate = styled.div`
  color: #868686;
  font-size: 1.3rem;
`;

const MoreCommentButton = styled.button`
  ${button}
  font-size: 1.6rem;
  font-weight: 600;
  background-color: white;
  border: 1px solid #cbcbcb;
  color: #6d6d6d;
  margin-top: 0;
`;

export default CommentList;
