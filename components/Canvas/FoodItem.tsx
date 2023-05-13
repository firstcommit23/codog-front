import styled from '@emotion/styled';
import { CHARACTER_CODES } from '@/apis/type';

interface FoodItemProps {
  // food?: 'A01' | 'A02' | 'A03' | 'A04' | '';
  food?: string;
}

const getFoodInfo = (code: string) => {
  const defaultValue = { right: '22%', bottom: '0' };
  switch (code) {
    case 'A01':
    case 'A05':
      return { ...defaultValue, bottom: '-1.4rem' };
    case 'A06':
      return { ...defaultValue, bottom: '-.7rem', right: '19%' };
    default:
      return defaultValue;
  }
};
const FoodItem = ({ food = '' }: FoodItemProps) => {
  const foodImage = `/images/items/${food}.svg`;

  const { right, bottom } = getFoodInfo(food);

  return <>{food && <FoodItemDiv food={foodImage} right={right} bottom={bottom}></FoodItemDiv>}</>;
};

const FoodItemDiv = styled.div<{ food: string; right: string; bottom: string }>`
  content: url(${(props) => `${props.food}`});
  position: absolute;
  right: ${(props) => `${props.right}`};
  bottom: ${(props) => `${props.bottom}`};
`;

export default FoodItem;
