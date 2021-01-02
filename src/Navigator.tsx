import React from 'react';
import Button from './Button';
import { Content } from './App';

interface NavigatorProps {
    changeContent: (content: Content) => void;
}

const Navigator = ({changeContent} : NavigatorProps) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', position: "absolute", top: "40%", left: "40%", fontSize: "3rem"}}>
            <div>
                TiMKOD App
            </div>
            <div style={{display: 'flex', margin: '8px'}}>
                <Button 
                    value='Task 1 (Lab2)' 
                    width='10rem' 
                    height='3rem'
                    onClick={() => changeContent(Content.Task1)}
                />
            </div>
            <div style={{display: 'flex', margin: '8px'}}>
                <Button 
                    value='Task 2 (Lab3)' 
                    width='10rem' 
                    height='3rem'
                    onClick={() => changeContent(Content.Task2)}
                />
            </div>
        </div>
    );
}

export default Navigator;