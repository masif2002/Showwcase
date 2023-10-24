import React from "react";
import styled from "styled-components";
import Icon from './Icon'
import {FaGithub} from 'react-icons/fa';
import { useHttpClient } from "./hooks/htttp-hook";
import ErrorModal from "./UIelement/ErrorModal";
import LoadingSpinner from "./UIelement/LoadingSpinner";

const CLIENT_ID = "9ca15689cc4006dee638";

const Auth = () => {
    const {isLoading, error, clearError} = useHttpClient();

    const loginWithGithub = () => {
        window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
    }

    return (
        <React.Fragment>
            <ErrorModal error = {error} onClear = {clearError}/>
            <MainContainer>
                {isLoading && <LoadingSpinner asOverlay/>}
                <WelcomeText>
                    Welcome
                </WelcomeText>

                {/* <form onSubmit={authSubmitHandler}>
                    <InputContainer>
                    {!isLogin && <Input
                        id = "name"
                        type = "text"
                        placeholder="Name"
                        validators = {[VALIDATOR_REQUIRE]}
                        errorText = "Please enter your name."
                        onInput = {inputHandler}
                    />
                    }
                    <Input
                        id = "email" 
                        type = "text" 
                        placeholder="Email" 
                        validators = {[VALIDATOR_EMAIL]}
                        errorText = "Please enter your email."
                        onInput = {inputHandler}
                    />
                    <Input 
                        id = "password"
                        type = "password" 
                        placeholder="Password" 
                        validators = {[VALIDATOR_MINLENGTH(8)]}
                        errorText = "Please enter your password."
                        onInput = {inputHandler}
                    />
                    </InputContainer>
                    <ButtonContainer>
                        <Button 
                            type = "submit" 
                            disabled = {!formState.isValid}
                            content={isLogin ? 'LOGIN' : 'SIGN UP'}
                        />
                    </ButtonContainer>
                </form>
                
                <HorizontalRule/> */}
                {/* <Span>Don't have an account ?<Link onClick={handleClick}>&nbsp; Sign Up</Link></Span> */}
                {/* <Button onClick = {switchModeHandler} content = {`SWITCH TO ${isLogin ? 'SIGN UP' : 'LOGIN'}`}></Button> */}
                <LoginWith>
                    Login With
                </LoginWith>
                <IconsContainer>
                    <Icon color = "#333">
                        <FaGithub onClick={loginWithGithub}/>
                    </Icon>                
                </IconsContainer>
            </MainContainer>
        </React.Fragment>
        
    )
}


const MainContainer = styled.div`
    margin-top: 20vh;
    margin-left: 37.5vw;
    margin-right: 37.5vw;
    align-self: start;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 40vh;
    width: 25vw;
    background: rgba(255,255,255,0.2);
    box-shadow: 0 8px 0 rgba(31,38,135,0.37);
    backdrop-filter: blur(7.2px);
    border-radius: 10px;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 0.4rem;

    @media only screen and (max-width: 320px){
        width: 80vw;
        height: 40vh;
        hr {
        margin-bottom: 0.3rem;
        }
        h4 {
        font-size: small;
        }
    }

    @media only screen and (min-width: 321px){
        width: 80vw;
        height: 40vh;
        h4 {
        font-size: small;
        }
    }

    @media only screen and (min-width: 411px) {
        width: 80vw;
        height: 40vh;
    }

    @media only screen and (min-width: 768px) {
        width: 70vw;
        height: 40vh;
    }

    @media only screen and (min-width: 1024px) {
        width: 70vw;
        height: 40vh;
    }

    @media only screen and (min-width: 1280px) {
        width: 30vw;
        height: 40vh;
    }
    `

    const WelcomeText = styled.h2`
    margin: 2.5rem 0;
    `

    const LoginWith = styled.div`
        margin-top: 1.5rem;   
    `

    const IconsContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin: 1rem 0 2rem 0;
    width: 80%;
    `

export default Auth