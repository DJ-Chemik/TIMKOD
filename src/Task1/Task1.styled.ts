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

export const UsageFrame = styled.div<{maxHeight?: number}>`
    margin: 2rem;
    padding: 1rem;
    border: 1px solid black;
    overflow: scroll;
    
    ${props => css`
        max-height: ${props.maxHeight}px;
    `}
`;