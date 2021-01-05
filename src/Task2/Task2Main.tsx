// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { Background, ContentBody, FrameTitle, SimpleMarginFrame, TitleHeader, UsageFrame } from './Task2.styled';
import TextScanner from './TextScanner';
import Ex1 from './Ex1';
import Ex2 from './Ex2';
import Ex3Markov1 from './Ex3Markov1';

export interface DictionaryWord {
    key: any;
    value: number;
}

const Task2Main = () => {
    const [scannedText, setScannedText] = useState<any>('');
    const [frequenciesDictionary, setFrequenciesDictionary] = useState<any>({});
    const [frequenciesTable, setFrequenciesTable] = useState<DictionaryWord[]>([]);

    return(
        <Background>
            <TitleHeader> Task 2 </TitleHeader>
            <ContentBody>
                <TextScanner scannedText={scannedText} setScannedText={setScannedText}/>
                <Ex1 
                    text={scannedText}
                    setMainDictionary={setFrequenciesDictionary}
                    setMainTable={setFrequenciesTable}
                />
                <Ex2 
                    mainTable={frequenciesTable}
                />
                <Ex3Markov1 
                    text={scannedText}
                    mainTable={frequenciesTable}
                    mainDictionary={frequenciesDictionary}
                />
            </ContentBody>
        </Background>
    );
}

export default Task2Main;