import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import moment from 'moment';
import { postProfileItem } from '@/apis/api';
import { ItemType } from '@/apis/type';
import useUserProfileQuery from '@/hooks/query/useUserProfileQuery';
import useUserFootprintQuery from '@/hooks/query/useUserFootprintQuery';
import useItemListQuery from '@/hooks/query/useItemListQuery';
import { modalState } from '@/components/states';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import { Canvas, DogCharacter, FoodItem, FurnitureItem } from '@/components/Canvas';

const ItemShopPage = () => {
  const today = new Date();
  const [selectedItem, setSeletedItem] = useState<string[]>([]);
  const [, setModal] = useRecoilState(modalState);

  const { data: userData, isSuccess: isSuccessUserData } = useUserProfileQuery();
  const { data: itemsData, isSuccess: isSuccessItemsData } = useItemListQuery();
  const { data: footprintData } = useUserFootprintQuery(
    String(moment(today).year()),
    String(moment(today).month())
  );
  const { mutate, isLoading } = useMutation((itemCodes: string[]) => postProfileItem(itemCodes));

  useEffect(() => {
    if (isSuccessUserData && userData && userData.itemCodes.length > 0) {
      setSeletedItem(userData.itemCodes);
    }
  }, [isSuccessUserData]);

  const handleSubmit = () => {
    mutate(selectedItem, {
      onSuccess: () => {
        setModal({
          isShow: true,
          title: '완료',
          content: '저장되었습니다.',
        });
      },
      onError: (error: any) => {
        const message = error?.response.data.error.message || '';
        alert(message);
      },
    });
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

  const getCategoryColor = (category: string) => {
    if (category === 'A') return '#ff646c';
    if (category === 'B') return '#64c8ff';
    return '#ff646c';
  };

  const selectedFoodItem = selectedItem?.filter((item: any) => item.includes('A')).join('') || '';
  const selectedFurnitureItem =
    selectedItem?.filter((item: any) => item.includes('B')).join('') || '';

  return (
    <DefaultLayout backgroundColor="#282828" height="none">
      {isSuccessUserData && (
        <>
          <FootprintCount>
            <span>
              내 발자국 수 🐾 : <em>{footprintData?.totalCount}</em>
            </span>
          </FootprintCount>
          <Canvas>
            <DogCharacter character={userData.characterCode} />
            <FoodItem food={selectedFoodItem} />
            <FurnitureItem furniture={selectedFurnitureItem} />
          </Canvas>
        </>
      )}

      <ItemContainer>
        <Title>코독 하우스 아이템</Title>
        <CodogItemList>
          {isSuccessItemsData &&
            itemsData?.map((item: ItemType) => {
              return (
                <CodogItem
                  onClick={() => {
                    handleSelectItem(item.itemCode);
                  }}
                  color={getCategoryColor(item.categoryCode)}
                  key={item.itemCode}
                  className={selectedItem?.includes(item.itemCode) ? 'selected' : ''}>
                  <RequisiteCount>{item.questRequisite}</RequisiteCount>
                  <ItemImage src={item.imageUrl || ''} />
                </CodogItem>
              );
            })}
        </CodogItemList>
      </ItemContainer>
      <ButtonSubmit onClick={handleSubmit} disabled={isLoading}>
        저장하기
      </ButtonSubmit>
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
    margin: -2px;
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
  &:disabled {
    background-color: #eeeeee;
  }
`;

export default ItemShopPage;
