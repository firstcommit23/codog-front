import styled from '@emotion/styled';
import React from 'react';

interface CanvasProps {
  children: React.ReactNode;
  paddingTop?: string;
  roomColor? : string;
}

const Canvas = ({ children, paddingTop , roomColor }: CanvasProps) => {
  return (
    <CanvasWrapper paddingTop={paddingTop}>
      <DogRoom roomColor={roomColor}/>
      {children}
    </CanvasWrapper>
  );
};

const CanvasWrapper = styled.div<{paddingTop?:string}>`
  position: relative;
  width: 100%;
  height: 25rem;
  background-color: #282828;
  overflow: hidden;
  padding-top: ${(props) => `${props.paddingTop ? props.paddingTop : '0'}`};
`;

const DogRoom = styled.div<{roomColor?:string}>`
  position: absolute;
  width: 18.8rem;
  height: 30.8rem;
  bottom: -9rem;
  left: 50%;
  transform: translate(-50%, 0%);
  background: ${(props)=>`${props.roomColor ? props.roomColor : '#82AAFF'}`};
  border-radius: 260.5px;

  :before {
    content: url('/images/Window_Day.svg');
    position: absolute;
    right: 3rem;
    top: 6rem;
    /* border: 5px solid gray;
    border-radius: 1.5rem; */
  }
`;

export default Canvas;
