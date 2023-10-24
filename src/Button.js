import styled from "styled-components";

export default function Button({type, content, onClick, disabled}) {
    return (
        <StyledButton type = {type} onClick={onClick} disabled = {disabled}>
            {content}
        </StyledButton>
    )
}

const StyledButton = styled.button`
    background: transparent;
    text-transform: capitalize;
    width: 100%;
    height: 3rem;
    border: none;
    padding: 6px 15px;
    color: white;
    text-decoration: none;
    border-radius: 20px;
    font-weight: bold;
    font-size: large;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s ease-in-out ;

    &:hover {
        color: #4db5ff;
        font-size: larger;
    }

    &:disabled,
    &:hover:disabled,
    &:active:disabled {
    background: #ccc;
    color: #979797;
    border-color: #ccc;
    cursor: not-allowed;
  }
`