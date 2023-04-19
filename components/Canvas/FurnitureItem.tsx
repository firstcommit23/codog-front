import styled from '@emotion/styled';
import { CHARACTER_CODES } from '@/apis/type';

interface FurnitureItemProps {
  furniture?: string;
}

const getFurnitureInfo = (code: string) => {
  const defaultValue = { left: '-4%', bottom: '-1.2rem' };
  switch (code) {
    case 'B02':
      return { ...defaultValue, left: '4rem', bottom: '8rem' };
    case 'B03':
      return { ...defaultValue, left: '2rem', bottom: '0' };
    default:
      return defaultValue;
  }
};

const FurnitureItem = ({ furniture = '' }: FurnitureItemProps) => {
  const furnitureImage = `/images/items/${furniture}.svg`;

  const { left, bottom } = getFurnitureInfo(furniture);

  return <>{furniture && <FoodItemDiv furniture={furnitureImage} left={left} bottom={bottom} />}</>;
};

const FoodItemDiv = styled.div<{ furniture: string; left: string; bottom: string }>`
  content: url(${(props) => `${props.furniture}`});
  position: absolute;
  left: ${(props) => `${props.left}`};
  bottom: ${(props) => `${props.bottom}`};
`;

export default FurnitureItem;
