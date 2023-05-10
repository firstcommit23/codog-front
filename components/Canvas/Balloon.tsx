import styled from '@emotion/styled';

interface BalloonProps {
  children: React.ReactNode;
  type?: 'Speech' | 'Think';
  color?: string;
  fontSize?: string;
  top?: string;
  right?: string;
}

const Balloon = ({ children, type = 'Speech', color, fontSize, top, right }: BalloonProps) => {
  return (
    <BalloonDiv className={type} color={color} fontSize={fontSize} top={top} right={right}>
      {children}
    </BalloonDiv>
  );
};

const BalloonDiv = styled.div<{
  fontSize: string | undefined;
  top: string | undefined;
  right: string | undefined;
}>`
  position: absolute;
  top: ${(props) => `${props.top ? props.top : '7rem'}`};
  right: ${(props) => `${props.right ? props.right : '50%'}`};
  padding: 1rem 1.2rem;
  background: #ffffff;
  border-radius: 1rem;
  text-align: center;
  font-weight: 600;
  font-size: ${(props) => `${props.fontSize ? props.fontSize : '1.6rem'}`};
  line-height: 2.1rem;
  color: ${(props) => `${props.color ? props.color : '#282828'}`};

  &.Speech:before {
    content: '';
    position: absolute;
    top: 3.5rem;
    right: 0;
    width: 1.3rem;
    height: 1.8rem;
    background: url('/images/SpeechBalloon.svg') no-repeat;
    border: 0;
  }

  &.Think:before {
    content: '';
    position: absolute;
    top: 4rem;
    right: 50%;
    width: 2.3rem;
    height: 2.8rem;
    background: url('/images/ThinkBalloon.svg') no-repeat;
    border: 0;
  }
`;
export default Balloon;
