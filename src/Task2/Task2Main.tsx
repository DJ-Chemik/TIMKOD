// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { Background, ContentBody, FrameTitle, SimpleMarginFrame, TitleHeader, UsageFrame } from './Task1.styled';
import TextScanner from './TextScanner';

const Task2Main = () => {
    const [scannedText, setScannedText] = useState<any>('');
    
    return(
        <Background>
            <TitleHeader> Task 2 </TitleHeader>
            <ContentBody>
                <TextScanner scannedText={scannedText} setScannedText={setScannedText}/>
            </ContentBody>
        </Background>
    );
}

export default Task2Main;