import styled from "@emotion/styled";

const Modal = () => {
    return (
        <Container>
            <ModalWrapper>
                <Text>🔗 링크가 복사되었습니다.</Text>
                <SubText>코독한 개발자들에게 <br/> 공유해보세요!</SubText>
                <ConfirmButton>확인</ConfirmButton>
            </ModalWrapper>
        </Container>
    );
}

export default Modal;

const Container = styled.div`
    background-color:rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 100;
    display: flex;
    justify-content: center;
`;

const ModalWrapper = styled.div`
    background-color: white;
    width: 250px;
    height: 180px;
    border-radius: 5px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    top: 35%;
`;

const Text = styled.div`
    font-size: 18px;
    font-weight: 600;
`;

const SubText = styled.div`
    font-size: 15px;
    text-align: center;
    color: #8C8C8C;
    line-height: 1.5;
    margin: 15px 0 30px 0;
`;

const ConfirmButton = styled.button`
    font-size: 16px;
    color: white;
    background-color: #282828;
    border: 0;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    position: absolute;
    bottom:0;
    width: 100%;
    height: 45px;

    &:hover{
        cursor:pointer;
    }
`;