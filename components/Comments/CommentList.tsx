import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import moment from 'moment';
import useInfiniteCommentsQuery from '@/hooks/query/useInfiniteCommentsQuery';
import { CommentType } from '@/apis/type';
import { deleteComment } from '@/apis/api';
import { modalState } from '@/components/states';
import { button } from '@/styles/common';

const CommentList = ({ footprintId }: { footprintId: number }) => {
  const COUNT = 3;
  const router = useRouter();
  const [, setModal] = useRecoilState(modalState);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteCommentsQuery(footprintId || 0, COUNT, {
      enabled: !!footprintId,
    });

  const { mutate, isLoading } = useMutation((commentId: number) => deleteComment(commentId));

  const handleLoadMore = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  const handleDelete = (commentId: number) => {
    setModal({
      isShow: true,
      title: '확인',
      content: '코멘트 삭제하시겠습니까?',
      isCancleButton: true,
      onClick: () => deleteCommentAction(commentId),
    });
  };

  const deleteCommentAction = (commentId: number) => {
    mutate(commentId, {
      onSuccess: () => {
        setModal({ isShow: true, title: '삭제완료', content: '삭제 완료 했습니다.' });
        refetch();
      },
      onError: (error: any) => {
        const message = error?.response.data.error.message || '';
        alert(message);
      },
    });
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
                    <CommentWriterNickname onClick={() => router.push(`/share/${item.github_id}`)}>
                      {item.nickname}
                    </CommentWriterNickname>
                    {/* TODO: 내가 작성하거나, 내가 주인장일경우에만 삭제버튼 보여야 함 */}
                    <div onClick={() => handleDelete(item.id)}>🗑</div>
                  </CommentWriterArea>
                  <CommentWriteDate>
                    {moment(item.created_at).format('YYYY-MM-DD HH:mm:ss')}
                  </CommentWriteDate>
                </CommentFirstLine>
                <CommentText>{item.contents}</CommentText>
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
  cursor: pointer;
`;

const CommentText = styled.div`
  padding: 0 2rem 2rem 2rem;
  font-size: 1.2rem;
  color: #282828;
  line-height: 1.8rem;
  word-break: break-word;
`;

const CommentWriteDate = styled.div`
  color: #868686;
  font-size: 1.2rem;
`;

const MoreCommentButton = styled.button`
  ${button}
  background-color: white;
  border: 1px solid #cbcbcb;
  color: #6d6d6d;
  margin-top: 0;
`;

export default CommentList;
