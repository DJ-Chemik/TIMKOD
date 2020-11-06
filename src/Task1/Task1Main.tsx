// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import Approximation0 from './Approximation0';
import Approximation1 from './Approximation1';
import LettersFrequency from './LettersFrequency';
import { Background, ContentBody, FrameTitle, SimpleMarginFrame, TitleHeader, UsageFrame } from './Task1.styled';
import TextScanner from './TextScanner';

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z', ' '];

export interface LetterInfo {
    letter: string,
    probability: number;
    count: number;
}

const Task1Main = () => {
    const [scannedText, setScannedText] = useState<any>('');
    const [letterInfos, setLetterInfos] = useState<LetterInfo[]>([]);
    
    useEffect(() => {
        const infos: LetterInfo[] = letters.map(letter => ({
            letter: letter, 
            probability: 0,
            count: 0,
        }))
        setLetterInfos(infos);
    }, [])

    const getFragment = (text: string, start: number, stop: number) => {
        let fragment = '';
        for (let i = start; i <= stop; i++) {
            fragment = fragment + text[i];
        }
        return fragment;       
    }

    return(
        <Background>
            <TitleHeader> Task 1 </TitleHeader>
            <ContentBody>
                <TextScanner scannedText={scannedText} setScannedText={setScannedText}/>
                <Approximation0/>
                <LettersFrequency
                    isActive={scannedText.length}
                    scannedText={scannedText} 
                    letterInfos={letterInfos} 
                    setLetterInfos={setLetterInfos}
                />
                <Approximation1 isActive={!!letterInfos[0].probability} letterInfos={letterInfos}/>
            </ContentBody>
        </Background>
    );
}

export default Task1Main;