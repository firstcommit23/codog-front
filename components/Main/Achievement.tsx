import styled from "@emotion/styled";
import { infoProps } from '@/public/types';

interface DataProps {
    data : infoProps;
}

const Achievement = ({data}:DataProps) => {
    const {totalCount,thisMonthTotalCount,continuousCount} = data || {};
    return(
        <AchievementContainer>
            <div className="item">
            <div className="title">총</div>
            <div className="content">
                <div className="total">{totalCount ?? ''}</div>
            </div>
            </div>
            <div className="vertical"></div>
            <div className="item">
            <div className="title">이번달</div>
                <div className="content">{thisMonthTotalCount ?? ''}</div>
            </div>
            <div className="vertical"></div>
            <div className="item">
            <div className="title">연속</div>
                <div className="content">{continuousCount ?? ''}</div>
            </div>
        </AchievementContainer>
    )
};


export default Achievement;

const AchievementContainer = styled.div`
    display: flex;
    margin: 4rem 0 2.5rem 0;
    row-gap: 18px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    .item {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .title {
        font-weight: 400;
        font-size: 15px;
        line-height: 18px;
        color: #8c8c8c;
        margin-bottom: 1.5rem;
        div {
        width: 40px;
        text-align: center;
        }
    }
    .content {
        font-family: 'Fira Code', monospace;
        font-weight: 600;
        font-size: 32px;
        line-height: 30px;
        color: #323232;

        .total {
            color: #1480ff;
        }
        div {
        width: 40px;
        text-align: center;
        }
    }

    .vertical {
        height: 4rem;
        border-right: 1px solid #d4d4d4;
    }
`;