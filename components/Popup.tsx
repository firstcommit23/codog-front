import styled from '@emotion/styled';

type Props = {
    children?: React.ReactNode
};

function Popup({children}: Props): JSX.Element {
    return(
        <PopupContainer>{children}</PopupContainer>
    )
}

export default Popup;

const PopupContainer = styled.div`
    display: block;
    position: absolute;
    padding: 8px 10px;
    background-color: white;
    border: 1px solid #1480FF;
    border-radius: 5px;
    color:#1480FF;
    font-size: 12px;

    :after{
    border-color: white transparent;
    border-style: solid;
    border-width: 0 6px 8px 6.5px;
    content: '';
    display: block;
    left: 45%;
    position: absolute;
    top: -7px;
    width: 0;
    z-index: 1;
    }

    :before{
    border-color:#1480FF transparent;
    border-style: solid;
    border-width: 0 6px 8px 6.5px;
    content: '';
    display: block;
    left: 45%;
    position: absolute;
    top: -9px;
    width: 0;
    z-index: 0;
    }
`;