import styled from '@emotion/styled';

interface BalloonProps {
  children: React.ReactNode;
  type?: 'Speech' | 'Think';
  color?: string;
  fontSize?: string;
}

const Balloon = ({ children, type = 'Speech', color, fontSize }: BalloonProps) => {
  return (
    <BallonDiv className={type} color={color} fontSize={fontSize}>
      {children}
    </BallonDiv>
  );
};

const BallonDiv = styled.div<{ fontSize: string | undefined }>`
  position: absolute;
  top: 10rem;
  right: 63%;
  padding: 0.8rem;
  background: #ffffff;
  border-radius: 1rem;
  text-align: center;
  font-weight: 600;
  font-size: ${(props) => `${props.fontSize ? props.fontSize : '1.6rem'}`};
  line-height: 2.1rem;
  color: ${(props) => `${props.color ? props.color : '#000'}`};

  &.Speech:before {
    content: '';
    position: absolute;
    top: 3.5rem;
    right: 0;
    width: 1.3rem;
    height: 1.8rem;
    background: url('/images/SpeechBallon.png') no-repeat;
    border: 0;
  }

  &.Think:before {
    content: '';
    position: absolute;
    top: 4rem;
    right: 0;
    width: 2.3rem;
    height: 2.8rem;
    background: url('/images/ThinkBallon.png') no-repeat;
    border: 0;
  }
`;
export default Balloon;
