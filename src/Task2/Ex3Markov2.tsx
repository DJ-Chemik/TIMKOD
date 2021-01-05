import React, { useState } from 'react';
import { FrameTitle, UsageFrame, SimpleMarginFrame } from './Task2.styled';
import { DictionaryWord } from './Task2Main';

interface Ex3Props {

}

const Ex3Markov2 = (props: Ex3Props) => {
    const [isLoading, setLoading] = useState<boolean>(true);
    
    if (isLoading) {
        return(
            <div>
                Ex 3 (Markov 2) Loading
            </div>
        )
    }

    return(
        <>
        <FrameTitle>Ex 3 (Markov 2)</FrameTitle>
        <UsageFrame maxHeight={200}>
            <SimpleMarginFrame>

            </SimpleMarginFrame>
        </UsageFrame>
        </>
    )
}

export default Ex3Markov2;