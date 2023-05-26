import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { userState } from '@/components/states';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import { Canvas, DogCharacter, Balloon } from '@/components/Canvas';
import useIntroCharacterListQuery from '@/hooks/query/useIntroCharacterListQuery';
import { getRoomColor } from '@/utils/serviceUtils';
import LocalStorage from '@/utils/LocalStorage';
import ClipLoader from 'react-spinners/ClipLoader';
import { flexCenter } from '@/styles/common';

const IntroCharacterPage = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);

  const [errorMessage, setErrorMessage] = useState('');
  const [character, setCharacter] = useState(user.character);

  const {
    data: characters,
    isSuccess,
    isError,
    isLoading,
  } = useIntroCharacterListQuery({ retry: 0 });

  useEffect(() => {
    const saveIntro = LocalStorage.get('saveIntro') || '';
    if (saveIntro && saveIntro.character) {
      setCharacter(saveIntro.character);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCharacter(e.target.value);
    setErrorMessage('');
  };

  const handleSubmit = () => {
    if (!character) {
      setErrorMessage('캐릭터를 선택해주세요!');
      return;
    }

    LocalStorage.set('saveIntro', { character });

    setUser({ ...user, character });
    router.push('/intro/nickname');
  };

  return (
    <DefaultLayout isShowMenu={false} height="110vh">
      <Canvas paddingTop="4rem" roomColor={getRoomColor(character)}>
        <DogCharacter character={character} />
        {character && (
          <Balloon top="14rem" right="59%" fontSize="2rem">
            👋
          </Balloon>
        )}
      </Canvas>
      <StepNavigation>
        <span className="active"></span>
        <span></span>
        <span></span>
      </StepNavigation>
      <ContentMessage>함께할 코독 개발자를 골라주세요!</ContentMessage>
      {isLoading && (
        <FlexCenter>
          <ClipLoader size={15} aria-label="Loading Spinner" data-testid="loader" />
        </FlexCenter>
      )}
      {isError && (
        <FlexCenter style={{ padding: '3rem 2rem', fontSize: '1.5rem', color: '#666666' }}>
          😱 조회 중 오류가 발생하였습니다.
          <br /> 잠시후 다시 시도해 주세요!
        </FlexCenter>
      )}
      <CharacterList>
        {isSuccess &&
          characters?.map((item: any, index: number) => {
            return (
              <CharacterItem key={item.code} color={getRoomColor(item.code)}>
                <input
                  type="radio"
                  id={item.code}
                  value={item.code}
                  onChange={handleChange}
                  checked={item.code === character}
                />
                <label htmlFor={item.code}>
                  <img src={item.imageUrl} />
                  <span className="coverRadio">
                    <svg viewBox="0 0 12 10">
                      <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                    </svg>
                  </span>
                  <span className="blind">{item.name}</span>
                </label>
              </CharacterItem>
            );
          })}
      </CharacterList>
      <ButtonSubmit onClick={handleSubmit} disabled={!character}>
        선택 완료
      </ButtonSubmit>
    </DefaultLayout>
  );
};

const CharacterList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 85%;
  margin: 3rem 0 2rem 0;

  @media screen and (max-width: 375px) {
    margin: 2.5rem 0 1.5rem 0;
  }
`;

const CharacterItem = styled.div`
  display: flex;
  flex-flow: column wrap;
  border-radius: 0.6rem;
  width: 100%;
  height: 100px;
  background-color: ${(props) => `${props.color ? props.color : 'white'}`};

  @media screen and (max-width: 375px) {
    height: 90px;
  }

  input:checked + label .coverRadio svg {
    stroke-dashoffset: 0;
  }
  input {
    display: none;
  }

  input:checked + label .coverRadio {
    background-color: black;
  }

  label {
    display: flex;
    cursor: pointer;
    border-radius: 0.5rem;
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: relative;
    opacity: 0.9;

    img {
      margin: auto;
      display: block;
    }
    &:checked + label {
      opacity: 1;
      box-shadow: 0 0 0 3px #282828;
    }

    .coverRadio {
      position: absolute;
      right: 1rem;
      top: 1rem;
      z-index: 1;
      width: 2rem;
      height: 2rem;
      border-radius: 20%;
      background: white;
      transition: transform 0.15s, opacity calc(0.15s * 1.2) linear;
      opacity: 1;
      transform: scale(1);

      svg {
        width: 13px;
        height: 11px;
        display: inline-block;
        vertical-align: top;
        fill: none;
        margin: 5px 0 0 3px;
        stroke: white;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 16px;
        transition: stroke-dashoffset 0.4s ease var(0.15s);
        stroke-dashoffset: 16px;
      }
    }
    .blind {
      display: none;
    }
  }
`;

const ContentMessage = styled.div`
  color: #323232;
  font-size: 2rem;
  font-weight: 600;
  line-height: 3rem;
  letter-spacing: -0.01em;
  padding-top: 2rem;
`;

const ErrorMessage = styled.div`
  position: relative;
  width: 15rem;
  height: 2rem;
  padding-top: 0.8rem;
  background: #fff6f6;
  border: #e8c8c8 solid 1px;
  border-radius: 6rem;
  text-align: center;
  font-weight: 600;
  line-height: 2.1rem;

  &:after {
    position: absolute;
    top: 3.5rem;
    left: 7.4rem;
    content: '';
    border-color: #e8c8c8 transparent;
    border-style: solid;
    border-width: 17px 7px 0px 7px;
    z-index: 1;
  }
  &:before {
    position: absolute;
    top: 3.6rem;
    left: 7.4rem;
    content: '';
    border-color: #e8c8c8 transparent;
    border-style: solid;
    border-width: 19px 8px 0px 8px;
    z-index: 0;
  }
`;

const ButtonSubmit = styled.button`
  width: 85%;
  background: #282828;
  border-radius: 0.5rem;
  border: 0;
  margin-top: 1.5rem;
  padding: 1.8rem 0;
  font-size: 1.8rem;
  color: #ffffff;
  line-height: 1.9rem;

  &:hover {
    background-color: #585858;
    cursor: pointer;
  }

  &:disabled {
    background-color: #eeeeee;
  }
`;

const StepNavigation = styled.div`
  display: flex;
  justify-content: cneter;
  padding-top: 3rem;

  span {
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    background: #d9d9d9;
    margin: 0.6rem;

    &.active {
      background: #444444;
    }
  }

  @media screen and (max-width: 375px) {
    padding-top: 2rem;

    span {
      width: 0.7rem;
      height: 0.7rem;
      margin: 0.5rem;
    }
  }
`;

const FlexCenter = styled.div`
  ${flexCenter}
  width: 100%;
  padding-top: 4rem;
  text-align: center;
  line-height: 3.5rem;
`;

export default IntroCharacterPage;
