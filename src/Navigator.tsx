import React from 'react';
import Button from './Button';

const Navigator = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', position: "absolute", top: "40%", left: "40%", fontSize: "3rem"}}>
            <div>
                TiMKOD App
            </div>
            <div style={{display: 'flex', margin: '8px'}}>
                <Button value='Task 1 (Lab2)' width='10rem' height='3rem'/>
            </div>
        </div>
    );
}

export default Navigator;