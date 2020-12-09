import React, { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { FrameTitle, SimpleMarginFrame, UsageFrame } from './Task1.styled';
import { LetterInfo } from './Task1Main';
import Unavailable from './Unavailable';

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z', ' '];

interface Props {
    isActive: boolean;
    letterInfos: LetterInfo[];
    getAverageWordLength: (text: string) => number;
}

const Markov1 = ({isActive, letterInfos, getAverageWordLength}: Props) => {
    const [numberOfLetters, setNumberOfLetters] = useState<number>(0);
    const [textMarkov1, setTextMarkov1] = useState<string>('');

    const foundFirstLetter = (infos: LetterInfo[], random: number) => {
        const found = infos.find(info => {
            if (info.probability >= random) {
                return info;
            }else {
                random = random - info.probability;
            }
        });
        if (found) {
            return found.letter;
        }  

        console.log("Zadziałało oszukiwanie typescripta. Coś poszło źle jednak");
        return ""; // Żeby oszukać typescripta
    }
    
    const generateText = () => {
        let text = '';
        const infos = [...letterInfos];
        
        let previousLetter = "";
        for (let i = 0; i < numberOfLetters; i++) {
            let random = Math.random();
            if (i === 0) {
                previousLetter = foundFirstLetter(infos, random);
                text += previousLetter;
                continue;
            }
            const found = infos.find(info => {
                const prob = info.propabilityAfter.get(previousLetter);
                if (prob) {
                    if (prob >= random) {
                        return info;
                    }else {
                        random = random - prob;
                    }
                }
            });
            if (found) {
                previousLetter = found.letter;
                text += previousLetter;
            }  
  
        }
        setTextMarkov1(text);
    }

    const handleChangeNumberOfLetters = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumberOfLetters(parseInt(event.target.value));
    }

    if (!isActive) {
        return(
            <Unavailable 
                title="Przybliżenie Markova 1 rzędu"
                description="NAJPIERW ZBADAJ CZĘSTOŚĆ WYSTĘPOWANIA LITER"
            />
        )
    }
    return(
        <>
            <FrameTitle>Przybliżenie Markova 1 rzędu</FrameTitle>
            <UsageFrame maxHeight={200}>
                <input placeholder="Ile liter wygenerować?" type='number' onChange={handleChangeNumberOfLetters}/>
                <button onClick={generateText}>Wygeneruj tekst</button>
                <SimpleMarginFrame>
                    Średnia długość słowa: { getAverageWordLength(textMarkov1)}
                </SimpleMarginFrame>
                <SimpleMarginFrame>
                    {textMarkov1}
                </SimpleMarginFrame>
                <SimpleMarginFrame>

                </SimpleMarginFrame>
            </UsageFrame>
        </>
    )
}

export default Markov1;