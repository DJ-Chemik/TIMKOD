// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { Background, ContentBody, FrameTitle, SimpleMarginFrame, TitleHeader, UsageFrame } from './Task2.styled';
import TextScanner from './TextScanner';
import Ex1 from './Ex1';
import Ex2 from './Ex2';
import Ex3Markov1 from './Ex3Markov1';
import Ex3Markov2 from './Ex3Markov2';

export interface DictionaryWord {
    key: any;
    value: number;
}

const Task2Main = () => {
    const [scannedText, setScannedText] = useState<any>('');
    const [frequenciesDictionary, setFrequenciesDictionary] = useState<any>({});
    const [frequenciesTable, setFrequenciesTable] = useState<DictionaryWord[]>([]);

    const [markov1Dict, setmarkov1Dict] = useState<any>(null);

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
                    setMarkov1Dict={setmarkov1Dict}
                />
                <Ex3Markov2 
                    text={scannedText}
                    mainTable={frequenciesTable}
                    mainDictionary={frequenciesDictionary}
                    firstWord=""
                    markov1Dict={markov1Dict}
                />
                <Ex3Markov2 
                    text={scannedText}
                    mainTable={frequenciesTable}
                    mainDictionary={frequenciesDictionary}
                    firstWord="probability"
                    markov1Dict={markov1Dict}
                />
            </ContentBody>
        </Background>
    );
}

export default Task2Main;