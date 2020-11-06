// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { FrameTitle, SimpleMarginFrame, UsageFrame } from './Task1.styled';
import { LetterInfo } from './Task1Main';
import Unavailable from './Unavailable';

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z', ' '];

interface Props {
    isActive: boolean;
    letterInfos: LetterInfo[];
}

const Approximation1 = ({isActive, letterInfos}: Props) => {
    const [numberOfLetters, setNumberOfLetters] = useState<number>(0);
    const [textWithApproximation1, setTextWithApproximation1] = useState<string>('');

    const generateText1 = () => {
        let text = '';
        const infos = [...letterInfos];
        
        for (let i = 0; i < numberOfLetters; i++) {
            let random = Math.random();
            const found = infos.find(info => {
                if (info.probability >= random) {
                    return info;
                }else {
                    random = random - info.probability;
                }
            });
            if (found) {
                text = text + found.letter;
            }  
        }
        
        setTextWithApproximation1(text);
    }

    const handleChangeNumberOfLetters = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumberOfLetters(parseInt(event.target.value));
    }

    if (!isActive) {
        return(
            <Unavailable 
                title="Przybliżenie 1 rzędu"
                description="NAJPIERW ZBADAJ CZĘSTOŚĆ WYSTĘPOWANIA LITER"
            />
        )
    }
    
    return(
        <>
            <FrameTitle>Przybliżenie 1 rzędu</FrameTitle>
            <UsageFrame maxHeight={200}>
                <input placeholder="Ile liter wygenerować?" type='number' onChange={handleChangeNumberOfLetters}/>
                <button onClick={generateText1}>Wygeneruj tekst</button>
                <SimpleMarginFrame>
                    {textWithApproximation1}
                </SimpleMarginFrame>
            </UsageFrame>
        </>
    )
}

export default Approximation1;