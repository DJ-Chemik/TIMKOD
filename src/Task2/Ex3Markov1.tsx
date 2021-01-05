import React, { useEffect, useState } from 'react';
import { FrameTitle, UsageFrame, SimpleMarginFrame } from './Task2.styled';
import { DictionaryWord } from './Task2Main';

interface Ex3Props {
    text: string;
    mainTable: DictionaryWord[];
    mainDictionary: any;
    setMarkov1Dict: (dict: any) => void;
}

const Ex3Markov1 = (props: Ex3Props) => {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [generatedText, setGeneratedText] = useState<string>('');

    const randomWord = () => {
        let random = Math.random();
        const found = props.mainTable.find(word => {
            if (word.value >= random) {
                return word;
            }else {
                random = random - word.value;
            }
        });
        return found?.key;
    };

    const randomMarkov1Word = (prevWord: string, markov1Dict: any) => {
        let random = Math.random();
        let x = 0;
        for (let key in markov1Dict[prevWord]) {
            const probability = markov1Dict[prevWord][key];
            x = x + probability;
            if (random <= x) {
                return key;
            }
        }
    };

    const generate = () => {
        const markov1Dict: any = {};
        const words = props.text.split(' ');
        for (let i = 0; i < words.length; i++) {
            const mainWord = words[i];
            const secondWord = words[i+1];

            if (!markov1Dict[mainWord]) {
                markov1Dict[mainWord] = {}
            }

            if (!markov1Dict[mainWord][secondWord]) {
                markov1Dict[mainWord][secondWord] = 0;
            }
            markov1Dict[mainWord][secondWord] += 1;          
        }
        for (let key in markov1Dict) {
            let sum = 0;
            for (let it in markov1Dict[key]) {
                sum++;
            }
            // Oblicz prawdopodobieństwa dla pary 2 słów
            for (let key2 in markov1Dict[key]) {
                markov1Dict[key][key2] = markov1Dict[key][key2] / sum;
            }
        }

        const firstWord = randomWord();
        let markovText = firstWord;
        const MAX_WORDS = 1000;
        let wordNumber = 1;
        let prevWord = firstWord;
        for (let i = wordNumber; i < MAX_WORDS; i++) {
            const foundWord = randomMarkov1Word(prevWord, markov1Dict);
            markovText = markovText + ' ' + foundWord;
            prevWord = foundWord;             
        }
        setGeneratedText(markovText);
        props.setMarkov1Dict(markov1Dict);
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        if (props.mainTable.length) {
            generate();
        }
    }, [props.text]);

    if (isLoading) {
        return(
            <div>
                Ex 3 (Markov 1) Loading
            </div>
        )
    }

    return(
        <>
        <FrameTitle>Ex 3 (Markov 1)</FrameTitle>
        <UsageFrame maxHeight={200}>
            <SimpleMarginFrame>
                {generatedText}
            </SimpleMarginFrame>
        </UsageFrame>
        </>
    )
}

export default Ex3Markov1;