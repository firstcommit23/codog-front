import styled from '@emotion/styled';
import { CHARACTER_CODES } from '@/apis/type';

interface DogCharacterProps {
  character?: CHARACTER_CODES | string;
  pose?: 'Default' | 'Hi';
  clothes?: 'Default';
  onClick?: () => void;
  left?: string;
}

// const getInfo = (code: string) => {
//   const defaultValue = { bottom: '-0.5rem' };
//   switch (code) {
//     // case 'C':
//     //   return { ...defaultValue, bottom: '0' };
//     default:
//       return defaultValue;
//   }
// };
const DogCharacter = ({
  character,
  pose = 'Default',
  clothes = 'Default',
  onClick,
  left,
}: DogCharacterProps) => {
  const dogImage = `/images/dogs/${character}/${clothes}_${pose}.svg`;
  // TODO: 노트북은 커밋 갯수에따라 자동 업그레이드 되어야 한다.
  return (
    <>
      <DogCharacterDiv img={dogImage} onClick={onClick} />
      <Laptop left={left} />
    </>
  );
};

const DogCharacterDiv = styled.div<{ img: string; bottom?: string }>`
  content: url(${(props) => `${props.img ? props.img : '/images/dogs/A/Default_Default.svg'}`});
  position: absolute;
  left: 53%;
  transform: translate(-50%, 0%);
  bottom: -0.5rem;
  cursor: pointer;
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

export default DogCharacter;
