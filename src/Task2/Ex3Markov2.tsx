import React, { useEffect, useState } from 'react';
import { FrameTitle, UsageFrame, SimpleMarginFrame } from './Task2.styled';
import { DictionaryWord } from './Task2Main';

interface Ex3Props {
    text: string;
    mainTable: DictionaryWord[];
    mainDictionary: any;
    firstWord?: string;
    markov1Dict: any;
}

const Ex3Markov2 = (props: Ex3Props) => {
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

    const randomMarkov2Word = (prevWords: string, markov2Dict: any) => {
        let random = Math.random();
        let x = 0;
        for (let key in markov2Dict[prevWords]) {
            const probability = markov2Dict[prevWords][key];
            x = x + probability;
            if (random <= x) {
                return key;
            }
        }
    };

    const generate = () => {
        const markov2Dict: any = {};
        const words = props.text.split(' ');
        for (let i = 0; i < words.length; i++) {
            const mainWords = words[i] + ' ' + words[i+1];
            const nextWord = words[i+2];

            if (!markov2Dict[mainWords]) {
                markov2Dict[mainWords] = {}
            }

            if (!markov2Dict[mainWords][nextWord]) {
                markov2Dict[mainWords][nextWord] = 0;
            }
            markov2Dict[mainWords][nextWord] += 1;          
        }
        
        for (let key in markov2Dict) {
            let sum = 0;
            for (let it in markov2Dict[key]) {
                sum++;
            }
            // Oblicz prawdopodobieństwa dla pary 2 słów
            for (let key2 in markov2Dict[key]) {
                markov2Dict[key][key2] = markov2Dict[key][key2] / sum;
            }
        }

        const firstWord = props.firstWord ? props.firstWord : randomWord();
        let markovText = firstWord;
        const MAX_WORDS = 1000;
        let wordNumber = 1;
        let prevWord1 = firstWord;
        let secondTmp = randomMarkov1Word(prevWord1, props.markov1Dict);
        if (secondTmp === undefined) {
            secondTmp = randomWord();
        }
        let prevWord2 = secondTmp as string;
        for (let i = wordNumber; i < MAX_WORDS; i++) {
            const combinatedKey = prevWord1 + ' ' + prevWord2;
            let foundWord = randomMarkov2Word(combinatedKey, markov2Dict);
            if (!foundWord) {
                props.firstWord && console.log('NOT FOUND WITH MARKOV 2')
                foundWord = randomMarkov1Word(prevWord2, props.markov1Dict);
                if (!foundWord) {
                    props.firstWord && console.log('NOT FOUND WITH MARKOV 1')
                    foundWord = randomWord();
                }
            }
            markovText = markovText + ' ' + foundWord;
            prevWord1 = prevWord2; 
            prevWord2 = foundWord as string;             
        }
        setGeneratedText(markovText);
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        if (props.mainTable.length && props.markov1Dict !== null) {
            generate();
        }
    }, [props.text, props.markov1Dict]);

    if (isLoading) {
        return(
            <div>
                Ex 3 (Markov 2) Loading
            </div>
        )
    }

    return(
        <>
        <FrameTitle>Ex 3 (Markov 2) (first word: {props.firstWord ? props.firstWord : '???'})</FrameTitle>
        <UsageFrame maxHeight={200}>
            <SimpleMarginFrame>
                {generatedText}
            </SimpleMarginFrame>
        </UsageFrame>
        </>
    )
}

export default Ex3Markov2;