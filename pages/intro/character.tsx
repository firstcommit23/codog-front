import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { getCharacter } from '@/apis/api';
import { userState } from '@/components/states';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import { Canvas, DogCharacter, Balloon } from '@/components/Canvas';

const IntroCharacterPage = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);

  type CharacterType = {
    id: number;
    code: string;
    name: string;
    image_url?: string;
  };
  const [errorMessage, setErrorMessage] = useState('');
  const [character, setCharacter] = useState(user.character);
  const [characterList, setCharacterList] = useState<CharacterType[]>([]);

  const colorList = ['#82AAFF', '#F07178', '#F9C66A'];

  const getNickname = async () => {
    const response = await getCharacter();
    setCharacterList(response);
  };

  useEffect(() => {
    getNickname();
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

    setUser({ ...user, character });
    router.push('/intro/nickname');
  };

  return (
    <DefaultLayout isShowMenu={false}>
      <Canvas>
        <DogCharacter character="A" pose="Hi" />
        <Balloon>👋</Balloon>
      </Canvas>
      <StepNavigation>
        <span className="active"></span>
        <span></span>
        <span></span>
      </StepNavigation>
      <ContentMessage>함께할 코독 개발자를 골라주세요!</ContentMessage>
      <CharacterList>
        {characterList.map((item: any, index: number) => {
          return (
            <CharacterItem key={item.code} color={colorList[index]}>
              <input
                type="radio"
                id={item.code}
                value={item.code}
                onChange={handleChange}
                checked={item.code === character}
              />
              <label htmlFor={item.code}>
                <img src={item.image_url} />
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
        선택완료
      </ButtonSubmit>
    </DefaultLayout>
  );
};

const CharacterList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-end;
  gap: 2rem;
  padding: 2rem;
`;

const CharacterItem = styled.div`
  display: flex;
  flex-flow: column wrap;
  border-radius: 0.6rem;
  width: 40%;
  height: 100px;
  background-color: ${(props) => `${props.color ? props.color : 'white'}`};

  input:checked + label .coverRadio svg {
    stroke-dashoffset: 0;
  }
  input {
    display: none;
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
      right: 5px;
      top: 3px;
      z-index: 1;
      width: 20px;
      height: 20px;
      border-radius: 20%;
      background: #282828;
      border: 2px solid #fff;
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
        stroke: #fff;
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
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
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
  width: 100%;
  max-width: 300px;
  background: #282828;
  border-radius: 5px;
  border: 0;
  margin-top: 15px;
  padding: 16px 0;
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

const StepNavigation = styled.div`
  display: flex;
  justify-content: cneter;
  padding-top: 2rem;

  span {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #d9d9d9;
    margin: 3px;

    &.active {
      background: #444444;
    }
  }
`;

export default IntroCharacterPage;
