import styled from '@emotion/styled';
import useTestQuery from '@/hooks/query/useTestQuery';

const Header = () => {
  const { data } = useTestQuery();
  console.log(data);
  return (
    <Container>
      <HeaderBox>
        <span>{`{Codog}`}</span>
      </HeaderBox>
    </Container>
  );
};
const Container = styled.div`
  padding-top: 60px;
`;
const HeaderBox = styled.div`
  position: fixed;
  width: 100%;
  height: 60px;
  left: 0px;
  top: 0px;
  background: #282828;

  span {
    position: absolute;
    width: 108px;
    height: 32px;
    left: 20px;
    top: 13px;
    font-family: 'Fire Code';
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 29px;
    color: #ffffff;
  }
`;

export default Header;
