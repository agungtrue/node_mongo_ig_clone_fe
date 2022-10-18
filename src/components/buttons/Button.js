import React from 'react'
import './Button.scss'

const STYLES = ['btn-primary', 'btn-outline'];
const SIZE = ['btn-medium', 'btn-large', 'btn-mobile', 'btn-wide'];
const COLOR = ['primary', 'blue', 'red', 'green'];

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize,
    buttonColor
}) => { 

    const checkBtnStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkBtnSize = SIZE.includes(buttonSize) ? buttonSize : SIZE[0];
    const checkBtnColor = SIZE.includes(buttonColor) ? buttonColor : COLOR[0];

    return (
        <button className={`btn ${checkBtnStyle} ${checkBtnSize} ${checkBtnColor}`} onClick={onClick} type={type}>
            { children }
        </button>
    )

};

// export default Button;
