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
    getAverageWordLength: (text: string) => number;
}

const Markov3 = ({isActive, letterInfos, scannedText, maxLetters, setLetterInfos, getAverageWordLength}: Props) => {
    const [numberOfLetters, setNumberOfLetters] = useState<number>(0);
    const [textMarkov3, setTextMarkov3] = useState<string>('');

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

    interface NewValue {
        letter: string;
        key: string;
        count: number;
    }

    const findConditionalProbabilityMarkov3 = () => {
        const newValues: NewValue[]  = [];
        for (let i = 0; i < maxLetters; i++) {
            const letter1 = getOneLetter(scannedText, i);
            const letter2 = getOneLetter(scannedText, i+1);
            const letter3 = getOneLetter(scannedText, i+2);
            const letters1 = letter1 + letter2 + letter3;
            const letter4 = getOneLetter(scannedText, i+3);
            const foundLetterInfo3 = letterInfos.find(inf => inf.letter === letter4);
            if (foundLetterInfo3) {
                const foundNewValue = newValues.filter(x => x.letter === letter4).find(x => x.key === letters1);
                if (!foundNewValue) {
                    const newValue: NewValue = {
                        letter: letter4,
                        key: letters1,
                        count: 1,
                    } 
                    newValues.push(newValue);

                }else {
                    foundNewValue.count = foundNewValue.count + 1;
                }
            }
        }
        newValues.forEach(newValue => {
            const foundLetterInfo = letterInfos.find(letterInfo => letterInfo.letter === newValue.letter);
            const fullCountForLetter = newValues.filter(x => x.letter === newValue.letter).reduce((acc, cur) => {
                acc += cur.count;
                return acc;
            }, 0);
            if (foundLetterInfo) {
                const probability = newValue.count / fullCountForLetter;
                foundLetterInfo.propabilityAfter.set(newValue.key, probability);    
            }
        });
        setLetterInfos(letterInfos);
    }

    useEffect(() => {
        findConditionalProbabilityMarkov3();
    }, [maxLetters, letterInfos]);

    const findFirstLetter = (infos: LetterInfo[], random: number) => {
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
    
    const findLetterWithMarkov1 = (infos: LetterInfo[], random: number, prevLetter: string) => {
        const found = infos.find(info => {
            const prob = info.propabilityAfter.get(prevLetter);
            if (prob) {
                if (prob >= random) {
                    return info;
                }else {
                    random = random - prob;
                }
            }
        });
        if (found) {
            return found.letter;
        }
        return "";
    }

    const generateText = () => {
        let text = '';
        const infos = [...letterInfos];
        
        let previousLetter = "";
        let prevThreeLetters = "";
        for (let i = 0; i < numberOfLetters; i++) {
            let random = Math.random();
            if (i === 0) {
                previousLetter = findFirstLetter(infos, random);
                prevThreeLetters += previousLetter;
                text += previousLetter;
                continue;
            }
            if (i <= 2) {
                previousLetter = findLetterWithMarkov1(infos, random, previousLetter);
                prevThreeLetters += previousLetter;
                text += previousLetter;
                continue;
            }
            
            let found = infos.find(info => {
                const allKeys = getKeysList(info.propabilityAfter.keys());
                const prob = info.propabilityAfter.get(prevThreeLetters);
                if (prob) {
                    console.log(prob)
                    if (prob >= random) {
                        return info;
                    }else {
                        random = random - prob;
                    }
                }
            });

            // GDYBY nie odnalazło przy żadnej literce poprzedniego paternu
            if (found === undefined) {
                const letter = findLetterWithMarkov1(infos, random, previousLetter);
                found = infos.find(info => info.letter === letter);
                prevThreeLetters += previousLetter;
                if (prevThreeLetters.length > 3) {
                    prevThreeLetters = prevThreeLetters.slice(1,4);
                }
                text += previousLetter;
            }
            if (found) {
                previousLetter = found.letter;
                prevThreeLetters += previousLetter;
                if (prevThreeLetters.length > 3) {
                    prevThreeLetters = prevThreeLetters.slice(1,4);
                }
                text += previousLetter;
            }
        }
        setTextMarkov3(text);
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
                    Średnia długość słowa: { getAverageWordLength(textMarkov3)}
                </SimpleMarginFrame>
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