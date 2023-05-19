import styled from '@emotion/styled';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

interface CommentsProps {
  footprintId: number | undefined;
  title: string;
  isShowCommentInput?: boolean;
  isOwner: boolean;
  loginUserId?: number;
}
const Comments = ({
  footprintId,
  title,
  isShowCommentInput = true,
  isOwner = false,
  loginUserId = -1,
}: CommentsProps) => {
  if (!footprintId) return null;

  return (
    <CommentContainer>
      <CommentWrapper>
        <CommentTitle>{title}</CommentTitle>
        {isShowCommentInput && <CommentInput footprintId={footprintId} />}
        <CommentList footprintId={footprintId} isOwner={isOwner} loginUserId={loginUserId} />
      </CommentWrapper>
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  width: 100%;
`;

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 3rem 2rem;
`;

const CommentTitle = styled.div`
  padding-left: 0.8rem;
  font-size: 2rem;
  font-weight: 600;
`;

export default Comments;
