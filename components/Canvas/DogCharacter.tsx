import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { CHARACTER_CODES } from '@/apis/type';

interface DogCharacterProps {
  character?: CHARACTER_CODES | string;
  pose?: 'Default' | 'Hi';
  clothes?: 'Default';
  onClick?: () => void;
  left?: string;
}

const getInfo = (code: string) => {
  const defaultValue = { width: '103px', height: '146px' };
  switch (code) {
    case 'A':
      return { ...defaultValue, width: '103px', height: '146px' };
    case 'B':
      return { ...defaultValue, width: '94px', height: '129px' };
    case 'C':
      return { ...defaultValue, width: '111px', height: '128px' };
    case 'D':
      return { ...defaultValue, width: '116px', height: '143px' };
    default:
      return defaultValue;
  }
};

const DogCharacter = ({
  character,
  pose = 'Default',
  clothes = 'Default',
  onClick,
  left,
}: DogCharacterProps) => {
  const dogImage = `/images/dogs/${character}/${clothes}_${pose}.svg`;
  const { height, width } = getInfo(character);
  function AnimatedDogCharacter({ img }: { img: string }) {
    return <DogCharacterDiv img={img} height={height} width={width} onClick={onClick} />;
  }
  // TODO: 노트북은 커밋 갯수에따라 자동 업그레이드 되어야 한다.
  return (
    <>
      <AnimatedDogCharacter img={dogImage} />
      <Laptop left={left} />
    </>
  );
};

const slideIn = keyframes`
  0% {
    transform: translate(-50%, -10%);
  }
  100% {
    transform: translate(-50%, 0);
  }
`;

const DogCharacterDiv = styled.div<{
  img: string;
  bottom?: string;
  height?: string;
  width?: string;
}>`
  background-image: url(${(props) => props.img});
  position: absolute;
  left: 53%;
  transform: translate(-50%, 0%);
  animation-name: ${slideIn};
  animation-duration: 0.1s;
  animation-timing-function: ease-out;
  bottom: -0.5rem;
  cursor: pointer;
  width: ${(props) => `${props.width ? props.width : '100px'}`};
  height: ${(props) => `${props.height ? props.height : '100px'}`};
`;

const Laptop = styled.div<{ left?: string }>`
  content: url('/images/notebook.svg');
  position: absolute;
  left: ${(props) => `${props.left ? props.left : '22%'}`};
  bottom: 0;

  @media screen and (max-width: 480px) {
    left: 18%;
  }
`;

export default React.memo(DogCharacter);
