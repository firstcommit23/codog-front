import styled from "@emotion/styled";
import { Common } from "@/styles/common";
import Link from "next/link";
import Image from "next/image";

const Menu = () => {
    return (
        <Container>
            <MenuList>
            <Header>
                <LogoTitle>{`{Codog}`}</LogoTitle>
                <Close>
                    <Image src="/images/close.svg" alt="close" width="18px" height="18px"/>
                </Close>
            </Header>
                <Link href="/">홈</Link>
                <Link href="/">마이페이지</Link>
                <Link href="/">공지사항</Link>
                <Link href="/">코독에 대하여...🐾</Link>
            </MenuList>     
        </Container>
        )
};

export default Menu;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    max-width: ${Common.maxWidth};
    position: relative;
`;

const MenuList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    box-sizing: border-box;
    width: 100%;
    height: 100vh;
    padding: 2rem 3rem 0 3rem;
    font-size: 2.2rem;
    gap: 3rem;
    background-color: ${Common.colors.black};
    color: ${Common.colors.white};
    position: absolute;
    z-index: 2;
    top:0;

    a{
        font-weight: 400;
        text-decoration: none;
    }

    a:hover{
        transition: all 0.3s ease-in-out; 
        color: ${Common.colors.gray} !important;
    }

    a:visited{
        color: ${Common.colors.white};
    }
`;

const Header = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4rem;
`;

const LogoTitle = styled.div`
    font-family: 'Fira Code', monospace;
    font-style: normal;
    font-weight: 500;
    font-size: 2.6rem;
    line-height: 2.9rem;
    color: #ffffff;

    &:hover {
        cursor: pointer;
    }
`;

const Close = styled.div`
    &:hover{
        cursor: pointer;
    }
`;
