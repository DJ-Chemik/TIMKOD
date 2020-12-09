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

const ConditionalProbability = ({isActive, letterInfos, scannedText, maxLetters}: Props) => {
    const [mostPopularLetters, setMostPopularLetters] = useState<LetterInfo[]>([]);

    const findMostPopularLetters = () => {
        if (letterInfos.length < 1) {
            return;
        }

        const mostPopular = letterInfos.reduce((acc: LetterInfo[] | undefined, cur: LetterInfo) => {
            if (!acc) {
                return;
            }
            if (!acc.length) {
                acc.push(cur);
                return acc;
            }
            if (acc.length === 1) {
                acc.push(cur);
                const sorted = acc.sort((a, b) => b.probability - a.probability);
                return sorted;
            }
            if (cur.probability > acc[1].probability) {
                acc[1] = cur;
                const sorted = acc.sort((a, b) => b.probability - a.probability);
                return sorted;
            }
            return acc;
        }, [] );

        if (mostPopular) {
            setMostPopularLetters(mostPopular);
        }
    }

    const getOneLetter = (text: string, position: number) => {
        return text[position];
    }

    const checkProbabilityForString = (text: string) => {
        let sumCount = 0;
        let textCount = 0;

        for (let i = 0; i < maxLetters; i++) {
            const letter1 = getOneLetter(scannedText, i);
            const letter2 = getOneLetter(scannedText, i+1);
            if (letter1 + letter2 === text) {
                textCount++;
            }
            sumCount++;
        }
        return textCount / sumCount;
    }

    const findConditionalPropability = () => {
        mostPopularLetters.map((popularLetter) => {
            letterInfos.map((letterInfo) => {
                const bigram = popularLetter.letter + letterInfo.letter;
                const probabilityOfPopularLetter = popularLetter.probability;
                const propabilityOfBigram = checkProbabilityForString(bigram);
                const conditionalPropability = propabilityOfBigram / probabilityOfPopularLetter;
                letterInfo.propabilityAfter.set(popularLetter.letter, conditionalPropability);
            });
        });
        
    }   

    useEffect(() => {
        findMostPopularLetters();
    }, [maxLetters, letterInfos])

    useEffect(() => {
        if (maxLetters && mostPopularLetters.length) {
            findConditionalPropability();
        }
    }, [mostPopularLetters, maxLetters]);

    if (!isActive) {
        return(
            <Unavailable 
                title="Prawdopodobieństwo warunkowe liter"
                description="NAJPIERW ZBADAJ CZĘSTOŚĆ WYSTĘPOWANIA LITER"
            />
        )
    }
    return(
        <>
            <FrameTitle>Prawdopodobieństwo warunkowe liter</FrameTitle>
            <UsageFrame maxHeight={200}>
                <SimpleMarginFrame>
                    Najpopularniejsze litery: <br/>
                    {mostPopularLetters.map(info => `
                        ${info.letter === " " ? "SPACJA" : info.letter}: ${info.probability * 100}%,   
                    ` )}
                </SimpleMarginFrame>
                <SimpleMarginFrame>
                    Prawdopodobieństwo warunkowe: <br/>
                    <table style={{border: "solid black 1px"}}>
                        <tr style={{border: "solid black 1px"}}>
                            <th style={{border: "solid black 1px"}}>Litera</th>
                            <th style={{border: "solid black 1px"}}>Prawdopodobieństwo po: {mostPopularLetters[0].letter === " " ? "SPACJA" : mostPopularLetters[0].letter}</th>
                            <th style={{border: "solid black 1px"}}>Prawdopodobieństwo po: {mostPopularLetters[1].letter === " " ? "SPACJA" : mostPopularLetters[1].letter}</th>
                        </tr>
                        {letterInfos.map(letterInfo => {
                            const prob1 = letterInfo.propabilityAfter.get(mostPopularLetters[0].letter);
                            const prob2 = letterInfo.propabilityAfter.get(mostPopularLetters[1].letter);
                            return(
                                <tr>
                                    <td>
                                        {letterInfo.letter === " " ? "SPACJA" : letterInfo.letter}
                                    </td>
                                    <td>
                                        {prob1 !== undefined ? `${prob1*100}%` : "???"}
                                    </td>
                                    <td>
                                        {prob2 !== undefined ? `${prob2*100}%` : "???"}
                                    </td>
                                </tr>
                            )
                        })}
                    </table>
                </SimpleMarginFrame>
            </UsageFrame>
        </>
    )
}

export default ConditionalProbability;