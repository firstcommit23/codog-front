import { Suspense, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import moment from 'moment';
import { putProfileItem } from '@/apis/api';
import type { ItemType } from '@/apis/type';
import useUserProfileQuery from '@/hooks/query/useUserProfileQuery';
import useUserFootprintQuery from '@/hooks/query/useUserFootprintQuery';
import useItemListQuery from '@/hooks/query/useItemListQuery';
import { getRoomColor } from '@/utils/serviceUtils';
import { modalState } from '@/components/states';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import { Canvas, DogCharacter, FoodItem, FurnitureItem } from '@/components/Canvas';
import { flexCenter, skeletonGradient } from '@/styles/common';

const ItemShopPage = () => {
  const today = new Date();
  const [selectedItem, setSeletedItem] = useState<string[]>([]);
  const [, setModal] = useRecoilState(modalState);

  const {
    data: userData,
    isSuccess: isSuccessUserData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUserProfileQuery();
  const {
    data: itemsData,
    isSuccess: isSuccessItemsData,
    isLoading: isItemLoading,
    isError: isItemError,
  } = useItemListQuery();
  const {
    data: footprintData,
    isSuccess: isSuccessFootprintData,
    isLoading: isFootprintLoading,
    isError: isFootprintError,
  } = useUserFootprintQuery(moment(today).format('YYYY'), moment(today).format('MM'));
  const { mutate, isLoading } = useMutation((itemCodes: string[]) => putProfileItem(itemCodes));

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
          title: '🍪 아이템 변경 완료!',
          content: '저장되었습니다.',
        });
      },
      onError: (error: any) => {
        const message = error?.response.data.error.message || '알 수 없는 오류가 발생하였습니다.';
        alert(message);
      },
    });
  };

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

  const isSelectError = isUserError || isItemError || isFootprintError;
  const isSelectLoading = isUserLoading || isItemLoading || isFootprintLoading;
  const isSelectSuccess = isSuccessUserData && isSuccessItemsData && isSuccessFootprintData;

  return (
    <DefaultLayout backgroundColor="#282828">
      <Canvas paddingTop="5rem" roomColor={getRoomColor(userData.characterCode)}>
        <FootprintCount>
          <div>내 발자국 수</div>
          {!isFootprintLoading ? (
            <TotalCount>{footprintData?.totalCount}</TotalCount>
          ) : (
            <SkeletonTotalCount>0</SkeletonTotalCount>
          )}
        </FootprintCount>
        <DogCharacter character={userData.characterCode} />
        <FoodItem food={selectedFoodItem} />
        <FurnitureItem furniture={selectedFurnitureItem} />
      </Canvas>
      <ItemContainer>
        <Title>코독 하우스 아이템</Title>
        {isSelectError && !isSelectLoading && (
          <FlexCenter>
            😱 조회 중 오류가 발생하였습니다.
            <br /> 잠시후 다시 시도해 주세요!
          </FlexCenter>
        )}
        <CodogItemList>
          {isSelectLoading && (
            <>
              {new Array(12).fill('').map((_, i) => (
                <SkeletonCodogItem key={`skeletonItem${i}`}>
                  <SkeletonInfoWrapper>
                    <SkeletonRequisiteCount>
                      <div></div>
                    </SkeletonRequisiteCount>
                  </SkeletonInfoWrapper>
                </SkeletonCodogItem>
              ))}
            </>
          )}
          {isSelectSuccess && (
            <>
              {itemsData?.map((item: ItemType) => {
                const isAvailableItem = (footprintData?.totalCount || 0) >= item.questRequisite;
                const isSelectedItem = selectedItem?.includes(item.itemCode);
                const itemClassName = isAvailableItem
                  ? isSelectedItem
                    ? 'selected'
                    : ''
                  : 'locked';
                const itemColor = isAvailableItem ? getCategoryColor(item.categoryCode) : '#000000';
                return (
                  <CodogItem
                    color={itemColor}
                    className={itemClassName}
                    key={item.itemCode}
                    onClick={() => {
                      isAvailableItem && handleSelectItem(item.itemCode);
                    }}>
                    <ItemImage src={item.imageUrl || ''} />
                    {!isAvailableItem && (
                      <LockedItemDiv>
                        <img src="/images/lock.svg"></img>
                        <div>발자국이 더 필요해요!</div>
                      </LockedItemDiv>
                    )}
                    <InfoWrapper>
                      <RequisiteCount>
                        <div>{item.questRequisite}</div>
                      </RequisiteCount>
                      <ItemTitle className={'title'}>{item.item}</ItemTitle>
                    </InfoWrapper>
                  </CodogItem>
                );
              })}
            </>
          )}
        </CodogItemList>
      </ItemContainer>
      <ButtonSubmit onClick={handleSubmit} disabled={isLoading || isSelectLoading || isSelectError}>
        저장하기
      </ButtonSubmit>
    </DefaultLayout>
  );
};

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #494747;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  width: 100%;
  margin-bottom: 5rem;
`;

const CodogItemList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  padding: 3rem;
  overflow-y: auto;

  @media screen and (max-width: 480px) {
    gap: 1rem;
    padding: 2.2rem;
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
  border-radius: 1rem;
  position: relative;
  height: 9rem;
  margin-bottom: 3rem;
  background-color: #3a3a3a;
  cursor: pointer;

  &.selected {
    margin: -2px;
    border: 2px solid ${(props) => `${props.color ? props.color : '#ff646c'}`};
  }

  /* &.locked {
    cursor: not-allowed;
  } */

  &.locked .title {
    opacity: 0.3;
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 3rem;
    top: 66%;
    background-color: #282828;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    /* ${(props) => `${props.color ? props.color : '#ff646c'}`} 11.1%,
      rgba(255, 86, 147, 0.97) 100% */
  }

  &.commingsoon::after {
    background: none;
  }
`;

const InfoWrapper = styled.div`
  position: absolute;
  bottom: -2.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  max-width: 11.5rem;
  width: 100%;
`;

const RequisiteCount = styled.div`
  color: #191919;
  font-weight: 600;
  background-color: #f2f2f2;
  padding: 0.2rem 0.5rem;
  border-radius: 2rem;
  z-index: 300;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%);

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  div::before {
    content: '';
    background: url('/images/paw_black.svg');
    display: inline-block;
    width: 1.4rem;
    height: 1.4rem;
    background-size: contain;
    margin-right: 0.2rem;
  }
`;

const ItemTitle = styled.div`
  width: 100%;
  color: white;
  font-size: 1.4rem;
  letter-spacing: 0;
  margin-left: 1rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

const LockedItemDiv = styled.div`
  position: absolute;
  text-align: center;
  font-size: 1.6rem;
  color: #ffffff;
  background-color: rgba(32, 32, 32, 0.85);
  height: 100%;
  width: 100%;
  border-radius: 1rem;
  z-index: 200;
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    width: 2rem;
    height: 2rem;
    margin-bottom: 0.8rem;
  }

  div {
    max-width: 6rem;
    word-break: keep-all;
    line-height: 1.4;
    font-size: 1.2rem;
    color: #bbbbbb;
  }
`;

const Title = styled.div`
  color: #fff;
  font-size: 2.2rem;
  margin: 4rem 3rem 1rem 3rem;
  font-weight: 600;
`;

const FootprintCount = styled.div`
  background: #282828;
  position: absolute;
  right: 2.2rem;
  top: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    color: #fff;
    font-size: 1.4rem;
    em {
      font-weight: 400;
    }
  }
`;

const TotalCount = styled.span`
  position: relative;
  display: inline-block;
  background: #f9f9f9;
  border-radius: 900rem;
  padding: 0.8rem 2rem 0.8rem 3.5rem;
  font-size: 1.6rem;
  margin-top: 1rem;

  :before {
    content: url('/images/paw_black.svg');
    position: absolute;
    left: 1.5rem;
  }
`;

const ButtonSubmit = styled.button`
  width: 100%;
  max-width: 450px;
  background: #282828;
  border-radius: 5px;
  border: 0;
  padding: 2rem 0;
  font-size: 18px;
  color: #ffffff;
  line-height: 19px;
  position: fixed;
  bottom: 0;
  z-index: 400;

  &:hover {
    background-color: #585858;
    cursor: pointer;
  }
  &:disabled {
    background-color: #eeeeee;
  }
`;

const SkeletonTotalCount = styled(TotalCount)`
  background: #3a3a3a;
  color: #3a3a3a;
  &:before {
    content: '';
    position: absolute;
    border-radius: 900rem;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    animation: ${skeletonGradient} 1.5s infinite ease-in-out;
  }
`;

const SkeletonCodogItem = styled(CodogItem)`
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    border-radius: 1rem;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 2;
    animation: ${skeletonGradient} 1.5s infinite ease-in-out;
  }
`;

const SkeletonInfoWrapper = styled(InfoWrapper)`
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    border-radius: 1rem;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 2;
    animation: ${skeletonGradient} 1.5s infinite ease-in-out;
  }
`;

const SkeletonRequisiteCount = styled.div`
  width: 100%;
  border-radius: 1rem;
  height: 1.4rem;
  background-color: #3a3a3a;
  animation: ${skeletonGradient} 1.5s infinite ease-in-out;
`;

const FlexCenter = styled.div`
  ${flexCenter};
  height: 20rem;
  font-size: 1.5rem;
  color: #fff;
  width: 100%;
  text-align: center;
  line-height: 3.5rem;
`;

export default ItemShopPage;
