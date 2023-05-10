import styled from '@emotion/styled';
import Link from 'next/link';
interface RoundBtnProps {
  iconUrl?: string;
  marginLeft?: string;
  backgroundColor?: string;
  route?: string;
}

const RoundButton = ({ iconUrl, marginLeft, backgroundColor, route }: RoundBtnProps) => {
  return (
    <Link href={`${route}`}>
      <StyledButton backgroundColor={backgroundColor}>
        <IconDiv iconUrl={`/images/icon/${iconUrl}.svg`} marginLeft={marginLeft}></IconDiv>
      </StyledButton>
    </Link>
  );
};

const StyledButton = styled.span<{ backgroundColor: string }>`
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

const IconDiv = styled.div<{ iconUrl: string; marginLeft: string }>`
  background: url(${(props) => `${props.iconUrl}`}) no-repeat;
  background-size: contain;
  width: 2rem;
  height: 2rem;
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : 0)};
`;

export default RoundButton;
