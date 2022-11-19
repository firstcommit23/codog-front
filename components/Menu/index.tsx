import styled from "@emotion/styled";
import { Common } from "@/styles/common";
import Link from "next/link";

const Menu = () => {
    return (
        <Container>
            <MenuList>
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
`;

const MenuList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    box-sizing: border-box;
    width: 100%;
    padding: 3rem;
    font-size: 2.2rem;
    gap: 3rem;
    background-color: ${Common.colors.black};
    color: ${Common.colors.white};

    a{
        font-weight: 400;
        text-decoration: none;
    }

    a:hover{
        color: ${Common.colors.gray} !important;
    }

    a:visited{
        color: ${Common.colors.white};
    }
`;
