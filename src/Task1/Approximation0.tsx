// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { FrameTitle, UsageFrame, SimpleMarginFrame } from './Task1.styled';

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z', ' '];

interface Props {

}

const Approximation0 = ({}: Props) => {
    const [textWithApproximation0, setTextWithApproximation0] = useState<string>('');
    const [numberOfLetters, setNumberOfLetters] = useState<number>(0);

    const randomInt = (min: number, max: number) => {
        return Math.floor(Math.random() * (+max+1 - +min)) + +min; 
    }

    const generateText0 = () => {
        let text = '';
        for (let i = 0; i < numberOfLetters; i++) {
            text = text + letters[randomInt(0, letters.length)];
        }
        setTextWithApproximation0(text);
    }

    const handleChangeNumberOfLetters = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumberOfLetters(parseInt(event.target.value));
    }
    
    return(
        <>
            <FrameTitle>Przybliżenie 0 rzędu</FrameTitle>
            <UsageFrame maxHeight={200}>
                <input placeholder="Ile liter wygenerować?" type='number' onChange={handleChangeNumberOfLetters}/>
                <button onClick={generateText0}>Wygeneruj tekst</button>
                <SimpleMarginFrame>
                    {textWithApproximation0}
                </SimpleMarginFrame>
            </UsageFrame>

        </>
    )
}

export default Approximation0;