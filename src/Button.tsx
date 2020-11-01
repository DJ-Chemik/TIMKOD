import React from 'react';

interface ButtonProps {
    title?: string;
    color?: string;
    value?: string;
    id?: string;
    name?: string;
    disabled?: boolean;
    onChange?: () => void;
    onClick?: () => void;
    width?: string;
    height?: string;
}

const Button = (props: ButtonProps) => {

    return(
        <button
            title={props.title}
            color={props.color}
            id={props.id}
            name={props.name}
            disabled={props.disabled}
            onChange={props.onChange}
            onClick={props.onClick}
            style={{
                width: props.width,
                height: props.height,
            }}
        >
            {props.value}
        </button>
        
    )
}

export default Button;