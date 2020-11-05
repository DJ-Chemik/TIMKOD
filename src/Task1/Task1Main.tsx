// eslint-disable-next-line
import React, { useState } from 'react';
import { ContentBody, TitleHeader, UsageFrame } from './Task1.styled';


const file = '../../task1/files/norm_hamlet.txt';

const Task1Main = () => {
    const [text, setText] = useState<any>('');

    const showFile = async (files: FileList | null) => {
        let file;
        if (files) {
            file = files[0];
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            const content = reader.result;
            setText(content);
        }
        file && reader.readAsText(file);
    }

    const getOneLetter = (position: number) => {
       return text[position];
    }

    const getFragment = (start: number, stop: number) => {
        let fragment = '';
        for (let i = start; i <= stop; i++) {
            fragment = fragment + text[i];
        }
        return fragment;       
    }


    return(
        <div>
            <TitleHeader>
                Task 1
            </TitleHeader>
            <ContentBody>
                <UsageFrame maxHeight={200}>
                    <input type="file" onChange={(e) => showFile(e.target.files)} />
                    <div style={{margin: '2rem'}}>
                        {text}
                    </div>
                </UsageFrame>

            </ContentBody>
        </div>
    );
}

export default Task1Main;