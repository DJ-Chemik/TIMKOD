import styled, { css } from 'styled-components';

export const TitleHeader = styled.div`
    font-size: 2rem;
    font-weight: 500;
    margin: 2rem;
    display: flex;
    justify-content: center;
`;

export const ContentBody = styled.div`
    margin: 2rem;
`;

export const FrameTitle = styled.div`
    font-size: 1.5rem;
    font-weight: 500;
    margin-top: 2rem;
`;

export const SimpleMarginFrame = styled.div`
    margin: 2rem;
`;

export const UsageFrame = styled.div<{maxHeight?: number}>`
    padding: 1rem;
    border: 1px solid black;
    overflow: scroll;
    
    ${props => css`
        max-height: ${props.maxHeight}px;
    `}
`;