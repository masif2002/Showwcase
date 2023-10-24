import styled from "styled-components";


export default function Icon({color, children}) {
    return (
        <StyledIcon background = {color}>
            {children}
        </StyledIcon>
    )
}

const StyledIcon = styled.div`
    height: 3.5rem;
    width: 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4rem;
    color: white;
    cursor: pointer;
    background: ${props => props.background};
    z-index:999;
    transition-property: all; 
    transition-duration: 0.3s; 
    transition-timing-function: ease; 
    svg {
        width: 1.5rem;
        height: 1.5rem;
    }

    &:hover {
        transform: scale(1.2);
    }
`