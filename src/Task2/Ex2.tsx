import React, { useState } from 'react';
import { FrameTitle, UsageFrame, SimpleMarginFrame } from './Task2.styled';

const Ex2 = () => {
    const [isLoading, setLoading] = useState<boolean>(true);

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

            </SimpleMarginFrame>
        </UsageFrame>
        </>
    )
}

export default Ex2;