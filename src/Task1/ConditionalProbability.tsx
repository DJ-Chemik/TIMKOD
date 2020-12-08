import React, { useEffect, useState } from 'react';
import { FrameTitle, SimpleMarginFrame, UsageFrame } from './Task1.styled';
import { LetterInfo } from './Task1Main';
import Unavailable from './Unavailable';

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z', ' '];

interface Props {
    isActive: boolean;
    letterInfos: LetterInfo[];
}

const ConditionalProbability = ({isActive, letterInfos}: Props) => {
    const [mostPopularLetters, setMostPopularLetters] = useState<LetterInfo[]>([]);

    

    useEffect(() => {
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
            if (acc.length == 1) {
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

    }, [letterInfos])

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
                        ${info.letter == " " ? "SPACJA" : info.letter}: ${info.probability * 100}%,   
                    ` )}
                </SimpleMarginFrame>
                <SimpleMarginFrame>
                    Prawdopodobieństwo warunkowe: <br/>
                    <table>
                        <tr>
                            <th>Litera</th>
                            <th>Prawdopodobieństwo po: {mostPopularLetters[0].letter == " " ? "SPACJA" : mostPopularLetters[0].letter}</th>
                            <th>Prawdopodobieństwo po: {mostPopularLetters[1].letter == " " ? "SPACJA" : mostPopularLetters[1].letter}</th>
                        </tr>
                        {letterInfos.map(letterInfo => {
                            return(
                                <tr>
                                    <td>
                                        {letterInfo.letter == " " ? "SPACJA" : letterInfo.letter}
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