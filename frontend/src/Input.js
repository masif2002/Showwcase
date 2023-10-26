import styled from "styled-components";

export default function Input({type, placeholder}) {
    return (
        <StyledInput type = {type} placeholder={placeholder}/>
    )
}

const StyledInput = styled.input`
    background: rgba(255, 255, 255, 0.15);
    /* box-shadow: 0 8px 32px 0 rgba(31,38,135,0.37); */
    border-radius: 0.5rem;
    background: transparent;
    border: 1px solid #4db5ff;
    width: 80%;
    height: 3rem;
    padding: 1rem;
    outline: none;
    color: #3c354e;
    font-size: 1rem;
    font-weight: bold;
    &:focus {
        display: inline-block;
        border-color: #fff;
        box-shadow: 0 0 0 0.1rem #fff;
        /* backdrop-filter: blur(12rem); */
        
    }
    &::placeholder {
        color: #b9abe099;
        font-weight: 100;
        font-size: 1rem;
    }
`