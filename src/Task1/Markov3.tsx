import React, { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { FrameTitle, SimpleMarginFrame, UsageFrame } from './Task1.styled';
import { LetterInfo } from './Task1Main';
import Unavailable from './Unavailable';

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z', ' '];

interface Props {
    isActive: boolean;
    letterInfos: LetterInfo[];
    setLetterInfos: (value: LetterInfo[]) => void;
    scannedText: any;
    maxLetters: number;
}

const Markov3 = ({isActive, letterInfos, scannedText, maxLetters, setLetterInfos}: Props) => {
    const [numberOfLetters, setNumberOfLetters] = useState<number>(0);
    const [textMarkov3, setTextMarkov1] = useState<string>('');

    const getOneLetter = (text: string, position: number) => {
        return text[position];
    }

    const getKeysList = (iterators: IterableIterator<string>) => {
        const allKeys: string[] = [];
        let isToContinue= true;
        while (isToContinue) {
            const key = iterators.next().value;
            if (key === undefined) {
                isToContinue = false;
                break;
            }
            allKeys.push(key);
        }
        return allKeys;
    }

    const findConditionalProbabilityMarkov3 = () => {
        for (let i = 0; i < maxLetters; i++) {
            const letter1 = getOneLetter(scannedText, i);
            const letter2 = getOneLetter(scannedText, i+1);
            const letter3 = getOneLetter(scannedText, i+2);
            const letters1 = letter1 + letter2 + letter3;
            const letter4 = getOneLetter(scannedText, i+3);
            const foundLetterInfo3 = letterInfos.find(inf => inf.letter === letter4);
            if (foundLetterInfo3) {
                const keysIterators = foundLetterInfo3.propabilityAfter.keys();
                const allKeysForLetter3 = getKeysList(keysIterators);
                const isInTheDictionary = allKeysForLetter3.some(key => key === letters1);
                if (!isInTheDictionary) {
                    let value = foundLetterInfo3.propabilityAfter.get(letters1);
                    if (value) {
                        value++;
                        foundLetterInfo3.propabilityAfter.set(letters1, value);
                    }else {
                        foundLetterInfo3.propabilityAfter.set(letters1, 1);
                    }

                }
            }
        }
        setLetterInfos(letterInfos);
    }

    useEffect(() => {
        findConditionalProbabilityMarkov3();
    }, [maxLetters, letterInfos]);

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
                title="Przybliżenie Markova 3 rzędu"
                description="NAJPIERW ZBADAJ CZĘSTOŚĆ WYSTĘPOWANIA LITER"
            />
        )
    }
    return(
        <>
            <FrameTitle>Przybliżenie Markova 3 rzędu</FrameTitle>
            <UsageFrame maxHeight={200}>
                <input placeholder="Ile liter wygenerować?" type='number' onChange={handleChangeNumberOfLetters}/>
                <button onClick={generateText}>Wygeneruj tekst</button>
                <SimpleMarginFrame>
                    {textMarkov3}
                </SimpleMarginFrame>
                <SimpleMarginFrame>

                </SimpleMarginFrame>
            </UsageFrame>
        </>
    )
}

export default Markov3;