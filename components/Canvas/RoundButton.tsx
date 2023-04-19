import styled from '@emotion/styled';
import { useRouter } from 'next/router';
interface RoundBtnProps {
  iconUrl?: string;
  backgroundColor?: string;
  route?: string;
}

const RoundButton = ({ iconUrl, backgroundColor, route }: RoundBtnProps) => {
  const router = useRouter();
  return (
    <StyledButton onClick={() => router.push(`${route}`)} backgroundColor={backgroundColor}>
      <IconDiv iconUrl={`/images/icon/${iconUrl}.svg`}></IconDiv>
    </StyledButton>
  );
};

const StyledButton = styled.button<{ backgroundColor: string }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 3.5rem;
  height: 3.5rem;
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : '#585858')};
  border-radius: 5rem;
  font-weight: 500;
  font-size: 1.5rem;
  border: none;

  &:hover {
    cursor: pointer;
    background-color: #666666;
    transition: all 0.2s ease;
  }
`;

const IconDiv = styled.div<{ iconUrl: string }>`
  background: url(${(props) => `${props.iconUrl}`}) no-repeat;
  background-size: contain;
  background-position: 50% 50%;
  width: 2.5rem;
  height: 2rem;
`;

export default RoundButton;
