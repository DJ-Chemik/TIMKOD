// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { FrameTitle, UsageFrame, SimpleMarginFrame } from './Task1.styled';
import { LetterInfo } from './Task1Main';
import Unavailable from './Unavailable';

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z', ' '];

interface Props {
    isActive: boolean;
    scannedText: any;
    letterInfos: LetterInfo[];
    setLetterInfos: (infos: LetterInfo[]) => void;
}

const LettersFrequency = ({isActive, scannedText, letterInfos, setLetterInfos}: Props) => {
    const [lettersToCheckInTest, setLettersToCheckInTest] = useState<number>(0);

    const getOneLetter = (text: string, position: number) => {
        return text[position];
    }

    const checkProbabilityForAllLetters = () => {
        const maxLetters = lettersToCheckInTest;
        const infos = [...letterInfos];
        infos?.forEach(info => {
            info.count = 0;
            info.probability = 0;
        });
        for (let i = 0; i < maxLetters; i++) {
            const letter = getOneLetter(scannedText, i);
            const foundInfo = infos.find(info => info.letter === letter);
            if (foundInfo) {
                foundInfo.count++;
            }             
        }
        const newInfos = infos.map(info => ({...info, probability: info.count/maxLetters}));
        const sortedInfos = newInfos.sort((a: LetterInfo, b: LetterInfo) => {
            return b.count - a.count;
        });
        setLetterInfos(sortedInfos);
    }

    if (!isActive) {
        return(
            <Unavailable 
                title="Częstość występowania liter w tekście<"
                description="NAJPIERW WCZYTAJ JAKIŚ TEKST"
            />
        )
    }
        
    return(
        <>
            <FrameTitle>Częstość występowania liter w tekście</FrameTitle> 
            <UsageFrame maxHeight={200}>
                <input placeholder="Ile liter sprawdzić?" type='number' onChange={(e) => {setLettersToCheckInTest(parseInt(e.target.value))}}/>
                <button onClick={checkProbabilityForAllLetters}>Oblicz</button>
                <SimpleMarginFrame>
                    {letterInfos.map(info => {
                        return (
                            <>
                                {info.letter === ' ' && 
                                    `SPACJA: ${info.count}   `
                                }
                                {info.letter !== ' ' && 
                                    `${ info.letter}: ${info.count}   `
                                }
                                <br/> 
                            </>
                        )
                    })}
                </SimpleMarginFrame>
            </UsageFrame>
        </>
    )
}

export default LettersFrequency;