import styled from '@emotion/styled';
import { CHARACTER_CODES } from '@/apis/type';

interface DogCharacterProps {
  character?: CHARACTER_CODES;
  pose?: 'Default' | 'Hi';
  clothes?: 'Default';
  onClick?: () => void;
}

const DogCharacter = ({
  character = 'A',
  pose = 'Default',
  clothes = 'Default',
  onClick,
}: DogCharacterProps) => {
  const dogImage = `/images/dogs/${character}/${clothes}_${pose}.png`;

  // TODO: 노트북은 커밋 갯수에따라 자동 업그레이드 되어야 한다.
  return (
    <>
      <DogCharacterDiv img={dogImage} onClick={onClick} />
      <Laptop />
    </>
  );
};

const DogCharacterDiv = styled.div<{ img: string }>`
  content: url(${(props) => `${props.img ? props.img : '/images/dogs/A/Default_Default.png'}`});
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  bottom: -2.8rem;
  cursor: pointer;
`;

const Laptop = styled.div`
  content: url('/images/notebook.png');
  position: absolute;
  left: 17%;
  bottom: 0;
`;

export default DogCharacter;
