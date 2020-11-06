// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { FrameTitle, UsageFrame, SimpleMarginFrame } from './Task1.styled';
import { LetterInfo } from './Task1Main';

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z', ' '];

interface Props {
    title: string;
    description: string;
}

const Unavailable = ({title, description}: Props) => {
    return(
        <>
        <FrameTitle>{title}</FrameTitle> 
        <UsageFrame maxHeight={200}>
            <SimpleMarginFrame>
                {description}
            </SimpleMarginFrame>
        </UsageFrame>
        </>
    )
}

export default Unavailable;