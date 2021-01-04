import React, { useEffect, useState } from 'react';
import { FrameTitle, UsageFrame, SimpleMarginFrame } from './Task2.styled';
import { DictionaryWord } from './Task2Main';

interface Ex2Props {
    mainTable: DictionaryWord[];
}

const Ex2 = (props: Ex2Props) => {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [generatedText, setGeneratedText] = useState<string>();

    const randomWord = () => {
        let random = Math.random();
        const found = props.mainTable.find(word => {
            console.log(word.key);
            if (word.value >= random) {
                return word;
            }else {
                random = random - word.value;
            }
        });
        return found?.key;
    };

    const generate = () => {
        let text = '';
        const NUMBER_WORDS_TO_GENERATE = 1000;
        for (let i = 0; i < NUMBER_WORDS_TO_GENERATE; i++) {
            const foundWord = randomWord();
            text = text + foundWord + ' ';
        }
        setGeneratedText(text);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        if (props.mainTable.length) {
            generate();
        }
    }, [props.mainTable]);

    if (isLoading) {
        return(
            <div>
                Ex 2 Loading
            </div>
        )
    }

    return(
        <>
        <FrameTitle>Ex 2</FrameTitle>
        <UsageFrame maxHeight={200}>
            <SimpleMarginFrame>
                {generatedText}
            </SimpleMarginFrame>
        </UsageFrame>
        </>
    )
}

export default Ex2;