// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { Background, ContentBody, FrameTitle, SimpleMarginFrame, TitleHeader, UsageFrame } from './Task2.styled';
import TextScanner from './TextScanner';
import Ex1 from './Ex1';
import Ex2 from './Ex2';
import Ex3 from './Ex3';

const Task2Main = () => {
    const [scannedText, setScannedText] = useState<any>('');
    
    return(
        <Background>
            <TitleHeader> Task 2 </TitleHeader>
            <ContentBody>
                <TextScanner scannedText={scannedText} setScannedText={setScannedText}/>
                <Ex1 text={scannedText}/>
                <Ex2 />
                <Ex3 />
            </ContentBody>
        </Background>
    );
}

export default Task2Main;