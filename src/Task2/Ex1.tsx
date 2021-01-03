import React, { useState, useEffect } from 'react';
import { FrameTitle, UsageFrame, SimpleMarginFrame } from './Task2.styled';
import { valueToNode } from '@babel/types';
import { any, number } from 'prop-types';

interface Ex1Props {
    text: string;
}

interface DictionaryWord {
    key: any;
    value: number;
}

const Ex1 = (props: Ex1Props) => {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [frequenciesDictionary, setFrequenciesDictionary] = useState<any>({});
    const [frequenciesTable, setFrequenciesTable] = useState<DictionaryWord[]>([]);


    const sortByProbability = (dict: any, dictionaryAsResult: boolean) => {
        const sorted = [];
        for (let key in dict) {
            sorted[sorted.length] = {
                key: key,
                value: dict[key]
            }
        }
        sorted.sort((a,b) => {
            return b.value - a.value;
        });

        const tmpDict: any = {};
        if (dictionaryAsResult) {
            for (let i = 0; i < sorted.length; i++) {
                tmpDict[sorted[i].key] = sorted[i].value;
            }
            return tmpDict;
        }
        return sorted;
    }

    const calculate = () => {
        const dict: any = {};
        let numberOfWords = 0;
        const words = props.text.split(' '); // 1 840 508 words in wiki
        // const limitedWords = words.splice(0, 1000000)
        // const limitedWords = words.splice(0, 1840508);
        // const limitedWords = words.splice(0);
        words.forEach(word => {
            console.log(numberOfWords);
            let isInDictionary = false;
            if (dict[word]) {
                isInDictionary = true;
            }
            if (!isInDictionary) {
                dict[word] = 0;
            }
            dict[word] += 1;
            numberOfWords +=1;

        });
        for (let key in dict) {
            dict[key] = dict[key] / numberOfWords;
        }
        const sortedDictionary = sortByProbability(dict, true);
        const sortedTable: any[] = sortByProbability(dict, false);
        setFrequenciesDictionary(sortedDictionary);
        setFrequenciesTable(sortedTable);

        if (props.text.length) {
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        calculate();
        
    }, [props.text]);
    

    if (isLoading) {
        return(
            <div>
                Ex 1 Loading
            </div>
        )
    }

    const KEY: any = "the";
    return(
        <>
        <FrameTitle>Ex 1</FrameTitle>
        <UsageFrame maxHeight={200}>
            <SimpleMarginFrame>
                {
                    frequenciesDictionary[KEY]
                }
            </SimpleMarginFrame>
        </UsageFrame>
        </>
    )
}

export default Ex1;