import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import { postComment } from '@/apis/api';
import { useRecoilState } from 'recoil';
import { modalState } from '@/components/states';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';

const MAX_COMMENT_LENGHT = 300;

const CommentInput = ({ footprintId }: { footprintId: number }) => {
  const [commentInput, setCommentInput] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [, setModal] = useRecoilState(modalState);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    ({ footprintId, contents }: { footprintId: number; contents: string }) =>
      postComment({ footprintId, contents })
  );

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setIsLogin(true);
    }
  }, []);

  const handleChangeComment = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setCommentInput(e.currentTarget.value);
  };

  const handleSubmit = async () => {
    if (!isAbleSubmitButton) return;
    if (!footprintId) return;

    mutate(
      { footprintId: footprintId, contents: commentInput },
      {
        onSuccess: () => {
          setModal({
            isShow: true,
            title: '🧸 완료',
            content: '등록되었습니다.',
          });
          setCommentInput('');
          queryClient.refetchQueries([queryKeys.GET_COMMENT_LIST]);
        },
        onError: (error: any) => {
          const message = error?.response.data.error.message || '';
          alert(message);
        },
      }
    );
  };

  const isAbleSubmitButton = isLogin && !!commentInput.length && !isLoading;

  const notLoginTextareaObj = !isLogin
    ? {
        onClick: () => {
          setModal({
            isShow: true,
            title: '🔐 로그인이 필요합니다.',
            content: '로그인 페이지로 이동하시겠습니까?',
            isCancleButton: true,
            onClick: () => router.push('/login'),
          });
        },
        placeholder: '코멘트를 작성하려면 로그인해 주세요!',
      }
    : {};

  return (
    <CommentInputWrraper>
      <CommentTextareaArea>
        <label htmlFor="commentText">
          <CommentTextarea
            id="commentText"
            placeholder="코멘트를 남겨주세요!"
            value={commentInput}
            onChange={handleChangeComment}
            maxLength={MAX_COMMENT_LENGHT}
            rows={6}
            {...notLoginTextareaObj}></CommentTextarea>
        </label>
      </CommentTextareaArea>
      <CommentToolbar>
        <CommentTextCounter>
          <span>
            {commentInput.length || 0}&nbsp;/&nbsp;{MAX_COMMENT_LENGHT}
          </span>
        </CommentTextCounter>
        <CommentSubmitButtonWrapper>
          <CommentSubmitButton onClick={handleSubmit} disabled={!isAbleSubmitButton}>
            등록
          </CommentSubmitButton>
        </CommentSubmitButtonWrapper>
      </CommentToolbar>
    </CommentInputWrraper>
  );
};

const CommentInputWrraper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 12px;
  min-height: 20rem;
  width: 100%;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%);
`;

const CommentTextareaArea = styled.div`
  flex: 1;
  padding: 2rem;
`;

const CommentTextarea = styled.textarea`
  backface-visibility: hidden;
  background-color: transparent;
  border: 0;
  overflow: hidden;
  word-break: break-word;
  width: 95%;
  resize: none;
  outline: none;
`;

const CommentToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  height: 5.4rem;
`;

const CommentTextCounter = styled.p`
  // position: absolute:
  // left: 2rem;
  // bottom: 2rem;
  color: #bbb;
  font-size: 1.4rem;
  line-height: 1.5rem;
  padding-left: 1rem;

  span {
    vertical-align: middle;
    display: block;
    height: 100%;
    line-height: 5.4rem;
  }
`;

const CommentSubmitButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CommentSubmitButton = styled.button`
  background-color: #494747;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  height: 3.4rem;
  padding: 0.5rem 1.4rem;
  margin: 0 1rem;
  color: #fff;

  &:disabled {
    border: 1px solid #eeeeee;
    background-color: #eeeeee;
  }
`;

export default CommentInput;
