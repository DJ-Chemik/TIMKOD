import styled, { css } from 'styled-components';

export const Background = styled.div`
    background-color: gray;
    width: available;
    height: 2000px;
`;

export const TitleHeader = styled.div`
    font-size: 2rem;
    font-weight: 500;
    padding: 2rem;
    display: flex;
    justify-content: center;
`;

export const ContentBody = styled.div`
    margin: 2rem;
`;

export const FrameTitle = styled.div`
    background-color: honeydew;
    font-size: 1.5rem;
    font-weight: 500;
    margin-top: 2rem;
`;

export const SimpleMarginFrame = styled.div`
    margin: 2rem;
`;

export const UsageFrame = styled.div<{maxHeight?: number}>`
    background-color: coral;
    padding: 1rem;
    border: 1px solid black;
    overflow: scroll;
    
    ${props => css`
        max-height: ${props.maxHeight}px;
    `}
`;