import styled from '@emotion/styled';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

interface CommentsProps {
  footprintId: number | undefined;
  title: string;
  isShowCommentInput?: boolean;
}
const Comments = ({ footprintId, title, isShowCommentInput = true }: CommentsProps) => {
  if (!footprintId) return null;

  return (
    <CommentContainer>
      <CommentWrapper>
        <CommentTitle>{title}</CommentTitle>
        {isShowCommentInput && <CommentInput footprintId={footprintId} />}
        <CommentList footprintId={footprintId} />
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
  gap: 2rem;
  padding: 3rem 2rem;
`;

const CommentTitle = styled.div`
  padding-left: 0.8rem;
  font-size: 1.8rem;
`;

export default Comments;
