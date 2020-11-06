// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { Background, ContentBody, FrameTitle, SimpleMarginFrame, TitleHeader, UsageFrame } from './Task1.styled';

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z', ' ']

interface LetterInfo {
    letter: string,
    probability: number;
    count: number;
}

const Task1Main = () => {
    const [scannedText, setScannedText] = useState<any>('');
    const [textWithApproximation0, setTextWithApproximation0] = useState<string>('');
    const [letterInfos, setLetterInfos] = useState<LetterInfo[]>([]);

    const [numberOfLetters, setNumberOfLetters] = useState<number>(0);
    const [lettersToCheckInTest, setLettersToCheckInTest] = useState<number>(0);

    useEffect(() => {
        const infos: LetterInfo[] = letters.map(letter => ({
            letter: letter, 
            probability: 0,
            count: 0,
        }))
        setLetterInfos(infos);
    }, [])

    const showFile = async (files: FileList | null) => {
        let file;
        if (files) {
            file = files[0];
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            const content = reader.result;
            setScannedText(content);
        }
        file && reader.readAsText(file);
    }

    const getOneLetter = (text: string, position: number) => {
       return text[position];
    }

    const getFragment = (text: string, start: number, stop: number) => {
        let fragment = '';
        for (let i = start; i <= stop; i++) {
            fragment = fragment + text[i];
        }
        return fragment;       
    }

    const handleChangeNumberOfLetters = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumberOfLetters(parseInt(event.target.value));
    }

    const randomInt = (min: number, max: number) => {
        return Math.floor(Math.random() * (+max+1 - +min)) + +min; 
    }

    const generateText0 = () => {
        let text = '';
        for (let i = 0; i < numberOfLetters; i++) {
            text = text + letters[randomInt(0, letters.length)]                        
        }
        setTextWithApproximation0(text);
    }

    const checkProbabilityForAllLetters = () => {
        const maxLetters = lettersToCheckInTest;
        const infos = [...letterInfos];
        infos?.forEach(info => {
            info.count = 0;
            info.probability = 0;
        });
        for (let i = 0; i < maxLetters; i++) {
            const letter = getOneLetter(scannedText, i);
            const foundInfo = infos.find(info => info.letter === letter);
            if (foundInfo) {
                foundInfo.count++;
            }             
        }
        setLetterInfos(infos);
    }

    const sortLetters = () => {
        const infos = letterInfos.sort((a: LetterInfo, b: LetterInfo) => {
            return b.count - a.count;
        })
        setLetterInfos([...infos]);
    }

    return(
        <Background>
            <TitleHeader>
                Task 1
            </TitleHeader>
            <ContentBody>
                <FrameTitle>Wczytywanie tekstu</FrameTitle>
                <UsageFrame maxHeight={200}>
                    <input type="file" onChange={(e) => showFile(e.target.files)} />
                    <SimpleMarginFrame>
                        {scannedText}
                    </SimpleMarginFrame>
                </UsageFrame>
                <FrameTitle>Przybliżenie 0 rzędu</FrameTitle>
                <UsageFrame maxHeight={200}>
                    <input type='number' onChange={handleChangeNumberOfLetters}/>
                    <button onClick={generateText0}>Wygeneruj tekst</button>
                    <SimpleMarginFrame>
                        {textWithApproximation0}
                    </SimpleMarginFrame>
                </UsageFrame>
                <FrameTitle>Częstość występowania liter w tekście</FrameTitle> 
                <UsageFrame maxHeight={200}>
                    <input type='number' onChange={(e) => {setLettersToCheckInTest(parseInt(e.target.value))}}/>
                    <button onClick={checkProbabilityForAllLetters}>Oblicz</button>
                    <button onClick={sortLetters}>Sortuj od największych</button>
                    <SimpleMarginFrame>
                        {letterInfos.map(info => {
                            let count = 0;
                            return (
                                <>
                                    {info.letter === ' ' && 
                                        `SPACJA: ${info.count}   `
                                    }
                                    {info.letter !== ' ' && 
                                        `${ info.letter}: ${info.count}   `
                                    }
                                    <br/> 
                                </>
                            )
                        })}
                    </SimpleMarginFrame>
                </UsageFrame>

            </ContentBody>
        </Background>
    );
}

export default Task1Main;