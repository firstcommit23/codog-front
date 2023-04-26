import copy from 'copy-to-clipboard';
import { useRecoilState } from 'recoil';
import { modalState } from '@/components/states';
import React from 'react';
import styled from '@emotion/styled';

interface ShareButtonProps {
  nickname: string;
  githubId: string;
}
const ShareButton = ({ nickname, githubId }: ShareButtonProps) => {
  const [, setModal] = useRecoilState(modalState);
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  const shareTitle = `${nickname}님의 코독하우스`;
  const shareText = '코독한 개발자의 발자국을 확인하세요!';
  const shareUrl = `${process.env.NEXT_PUBLIC_CODOG_FRONT_URL}/share/${githubId}`;

  const handleCopy = () => {
    copy(shareUrl);
    setModal({
      isShow: true,
      title: '📎 링크가 복사되었습니다.',
      content: '공유하고 싶은 곳에 붙여넣기 하세요!',
    });
  };

  const handleClick = () => {
    if (isMobile) {
      if (navigator.share) {
        navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } else {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  return (
    <StyledButton onClick={handleClick}>
      <IconDiv iconUrl={`/images/icon/Share_Android.svg`} marginLeft="-2px"></IconDiv>
    </StyledButton>
  );
};

const StyledButton = styled.a<{ backgroundColor?: string }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 3.5rem;
  height: 3.5rem;
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : '#585858')};
  border-radius: 5rem;
  font-weight: 500;
  font-size: 1.5rem;
  border: none;

  &:hover {
    cursor: pointer;
    background-color: #666666;
    transition: all 0.2s ease;
  }
`;

const IconDiv = styled.div<{ iconUrl: string; marginLeft: string }>`
  background: url(${(props) => `${props.iconUrl}`}) no-repeat;
  background-size: contain;
  width: 2rem;
  height: 2rem;
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : 0)};
`;
export default ShareButton;
