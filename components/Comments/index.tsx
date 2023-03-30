import styled from '@emotion/styled';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

interface CommentsProps {
  title: string;
  isShowCommentInput?: boolean;
}
const Comments = ({ title, isShowCommentInput = true }: CommentsProps) => {
  return (
    <CommentContainer>
      <CommentWrapper>
        <CommentTitle>{title}</CommentTitle>
        {isShowCommentInput && <CommentInput />}
        <CommentList />
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
