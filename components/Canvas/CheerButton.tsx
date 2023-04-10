import styled from '@emotion/styled';

const CheerButton = () => {
  return (
    <CheerBtn>
      <span>10</span>
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
