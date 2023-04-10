import { putCheerCount } from '@/apis/api';
import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

interface CheerProps {
  cheer?: number;
}

const CheerButton = ({ cheer }: CheerProps) => {
  const [cheerCount, setCheerCount] = useState(cheer);
  const handleIncrease = () => {
    setCheerCount(cheerCount + 1);
  };

  const { mutate } = useMutation((cheerCount: number) => putCheerCount(cheerCount));
  useEffect(() => {
    mutate(cheerCount, {
      onSuccess: () => {},
      onError: (error: any) => {
        const message = error?.response.data.error.message || '';
        alert(message);
      },
    });
  }, [cheerCount]);
  return (
    <CheerBtn onClick={handleIncrease}>
      <span>{cheerCount}</span>
    </CheerBtn>
  );
};

const CheerBtn = styled.button`
  background-color: #fff5e3;
  padding: 0.6rem 1.2rem;
  border-radius: 5rem;
  min-width: 6.5rem;
  position: absolute;
  right: 3rem;
  top: 9rem;
  border: none;

  font-family: 'Fira Code', monospace;
  color: #ff6f06;
  font-size: 1.6rem;

  cursor: pointer;

  &:active {
    transform: scale(1.05);
    transition: all ease 0.2s;
  }

  span {
    display: flex;
    align-items: center;
    font-weight: 500;
  }

  span::before {
    content: '';
    background: url('/images/cheer.svg') no-repeat;
    background-size: contain;
    width: 1.6rem;
    height: 1.6rem;
    display: inline-block;
    margin-right: 0.5rem;
  }
`;

export default CheerButton;
