// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { FrameTitle, UsageFrame, SimpleMarginFrame } from './Task1.styled';

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z', ' '];

interface Props {
    scannedText: any;
    setScannedText: (text: any) => void;
}

const TextScanner = ({scannedText, setScannedText}: Props) => {
    
    
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

    return(
        <>
            <FrameTitle>Wczytywanie tekstu</FrameTitle>
            <UsageFrame maxHeight={200}>
                <input type="file" onChange={(e) => showFile(e.target.files)} />
                <SimpleMarginFrame>
                    {scannedText}
                </SimpleMarginFrame>
            </UsageFrame>
        </>
    )
}

export default TextScanner;