import styled from '@emotion/styled';
import React from 'react';

interface CanvasProps {
  children: React.ReactNode;
  paddingTop?: string;
}

const Canvas = ({ children, paddingTop }: CanvasProps) => {
  return (
    <CanvasWrapper padding={paddingTop}>
      <DogRoom />
      {children}
    </CanvasWrapper>
  );
};

const CanvasWrapper = styled.div<{padding?:string}>`
  position: relative;
  width: 100%;
  height: 25rem;
  background-color: #282828;
  overflow: hidden;
  padding-top: ${(props) => `${props.padding ? props.padding : '0'}`};
`;

const DogRoom = styled.div`
  position: absolute;
  width: 18.8rem;
  height: 30.8rem;
  bottom: -9rem;
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
