import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import moment from 'moment';
import useUserProfileQuery from '@/hooks/query/useUserProfileQuery';
import useUserFootprintQuery from '@/hooks/query/useUserFootprintQuery';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import { Canvas, DogCharacter, FoodItem, FurnitureItem } from '@/components/Canvas';

const ITEM_LIST = [
  {
    code: 'A01',
    name: '아이스아메리카노',
    requisite: 1,
    image_url: '/images/items/A01.png',
    code_category_id: 'A',
  },
  {
    code: 'A02',
    name: '따뜻한아메리카노',
    requisite: 5,
    image_url: '/images/items/A02.png',
    code_category_id: 'A',
  },
  {
    code: 'A03',
    name: '따뜻한티',
    requisite: 10,
    image_url: '/images/items/A03.png',
    code_category_id: 'A',
  },
  {
    code: 'A04',
    name: '딸기 케이크',
    requisite: 20,
    image_url: '/images/items/A04.png',
    code_category_id: 'A',
  },

  {
    code: 'A05',
    name: '에너지 드링크',
    requisite: 30,
    image_url: '/images/items/A05.png',
    code_category_id: 'A',
  },
  {
    code: 'A06',
    name: '컵라면과 삼김',
    requisite: 40,
    image_url: '/images/items/A06.png',
    code_category_id: 'A',
  },
  {
    code: 'A07',
    name: '초코 케이크',
    requisite: 20,
    image_url: '/images/items/A07.png',
    code_category_id: 'A',
  },
  {
    code: 'B01',
    name: '전등',
    requisite: 50,
    image_url: '/images/items/B01.png',
    code_category_id: 'B',
  },
  {
    code: 'B02',
    name: '앗!금지 포스티잇',
    requisite: 60,
    image_url: '/images/items/B02.png',
    code_category_id: 'B',
  },
  {
    code: 'B03',
    name: '푸릇푸릇 화분',
    requisite: 70,
    image_url: '/images/items/B03.png',
    code_category_id: 'B',
  },
];

const ItemShopPage = () => {
  const today = new Date();
  const [selectedItem, setSeletedItem] = useState<string[]>([]); //A01, B01

  const { data: userData, isSuccess: isSuccessUserData } = useUserProfileQuery();
  const { data: footprintData } = useUserFootprintQuery(
    String(moment(today).year()),
    String(moment(today).month())
  );

  // TODO: 아이템 목록 조회

  // TODO: 내가 선택한 아이템 가져오기
  useEffect(() => {
    if (isSuccessUserData && userData && userData.itemCodes.length > 0) {
      console.log(userData.itemCodes, userData.itemCodes);
      // setSeletedItem(userData.itemCodes);
    }
  }, [userData, isSuccessUserData]);

  // TODO: 저장하기
  const handleSubmit = () => {
    alert('구현 예정!');
  };

  // TODO: 내 발자국 갯수와 비교해서 아직 선택하지 못하는 아이템일 경우 딤드 처리

  const handleSelectItem = (code: string) => {
    const currentCategory = code.substring(0, 1);
    const isExist = selectedItem?.includes(code);

    setSeletedItem((prev) => {
      const newItem = [...prev].filter((item: any) => item.substring(0, 1) !== currentCategory);
      if (!isExist) newItem.push(code);
      return newItem;
    });
  };

  const selectedFoodItem = selectedItem?.filter((item: any) => item.includes('A')).join('') || '';
  const selectedFurnitureItem =
    selectedItem?.filter((item: any) => item.includes('B')).join('') || '';

  const categoryColor = (category: string) => {
    if (category === 'A') return '#ff646c';
    if (category === 'B') return '#64c8ff';
    return '#ff646c';
  };

  return (
    <DefaultLayout isShowMenu={false} backgroundColor="#282828">
      <FootprintCount>
        <span>
          내 발자국 수 🐾 : <em>{footprintData?.totalCount}</em>
        </span>
      </FootprintCount>
      <Canvas>
        <DogCharacter character="A" />
        <FoodItem food={selectedFoodItem} />
        <FurnitureItem furniture={selectedFurnitureItem} />
      </Canvas>

      <ItemContainer>
        <Title>코독 하우스 아이템</Title>
        <CodogItemList>
          {ITEM_LIST.map((item: any) => {
            return (
              <CodogItem
                onClick={() => {
                  handleSelectItem(item.code);
                }}
                color={categoryColor(item.code_category_id)}
                key={item.code}
                className={selectedItem?.includes(item.code) ? 'selected' : ''}>
                <RequisiteCount>{item.requisite}</RequisiteCount>
                <ItemImage src={item.image_url} />
              </CodogItem>
            );
          })}
        </CodogItemList>
      </ItemContainer>
      <ButtonSubmit onClick={handleSubmit}>저장하기</ButtonSubmit>
    </DefaultLayout>
  );
};

const CodogItemList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
  gap: 2rem;
  padding: 2rem;
  overflow-y: auto;
`;

const RequisiteCount = styled.div`
  position: absolute;
  right: 1rem;
  top: 0.4rem;
  color: #ffffff;
  font-weight: 800;

  :before {
    content: url('/images/footprint_s_icon.svg');
    position: absolute;
    left: -1.3rem;
  }
`;
const ItemImage = styled.img`
  display: block;
  object-fit: none;
  z-index: 2;
  height: 100%;
`;

const CodogItem = styled.div`
  display: flex;
  flex-flow: column wrap;
  border-radius: 0.6rem;
  position: relative;
  width: 28%;
  height: 9rem;
  overflow: hidden;
  background-color: #3a3a3a;

  &.selected {
    border: 2px solid ${(props) => `${props.color ? props.color : '#ff646c'}`};
  }

  &::after {
    content: '';
    position: absolute;
    width: 120%;
    left: -10%;
    height: 100%;
    top: 65%;
    border-radius: 100rem;
    background: linear-gradient(
      180deg,
      ${(props) => `${props.color ? props.color : '#ff646c'}`} 11.1%,
      rgba(255, 86, 147, 0.97) 100%
    );
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #494747;
`;

const Title = styled.div`
  color: #fff;
  font-size: 2.2rem;
  margin: 2rem;
`;

const FootprintCount = styled.div`
  width: 100%;
  text-align: right;
  background: #282828;

  span {
    margin-right: 3rem;
    color: #fff;
    font-size: 1.2rem;
    em {
      font-weight: 600;
    }
  }
`;

const ButtonSubmit = styled.button`
  width: 100%;
  background: #282828;
  border-radius: 5px;
  border: 0;
  padding: 2rem 0;
  font-size: 18px;
  color: #ffffff;
  line-height: 19px;

  &:hover {
    background-color: #585858;
    cursor: pointer;
  }
`;

export default ItemShopPage;
