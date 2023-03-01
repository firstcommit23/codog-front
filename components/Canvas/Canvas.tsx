import styled from '@emotion/styled';
import React from 'react';

interface CanvasProps {
  children: React.ReactNode;
}

const Canvas = ({ children }: CanvasProps) => {
  return (
    <CanvasWapper>
      <DogRoom />
      {children}
    </CanvasWapper>
  );
};

const CanvasWapper = styled.div`
  position: relative;
  width: 100%;
  height: 25rem;
  background-color: #282828;
  overflow: hidden;
`;

const DogRoom = styled.div`
  position: absolute;
  width: 18.8rem;
  height: 30.8rem;
  top: 3rem;
  left: 50%;
  transform: translate(-50%, 0%);
  background: #99b9ff;
  border-radius: 260.5px;

  :before {
    content: url('/images/Picture.png');
    position: absolute;
    right: 21px;
    top: 54px;
  }
`;

export default Canvas;
