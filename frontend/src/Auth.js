import React from "react";
import styled from "styled-components";
import Icon from './Icon'
import {FaGithub} from 'react-icons/fa';
import Input from './Input'

const CLIENT_ID = "4b9f0b4d2f261ef00d45";

const Auth = () => {

    const loginWithGithub = () => {
        window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
    }

    return (
        <Wrapper>
            <MainContainer>
                <WelcomeText>
                    Welcome
                </WelcomeText>
                <InputContainer>
                    <Input type = "text" placeholder="Email"/>
                    <Input type = "password" placeholder="Password"/>
                </InputContainer>
                <ButtonContainer>
                    <Btn>
                        Sign up
                    </Btn>
                </ButtonContainer>
                <LoginWith>
                    Or Login With
                </LoginWith>
                <HorizontalRule/>
                <IconsContainer>
                    <Icon color = "#333" name = "GitHub">
                        <FaGithub onClick={loginWithGithub}/>
                    </Icon>                
                </IconsContainer>
            </MainContainer>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin: 4rem auto;
    padding: 2rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  width: 30vw;
  /* background: rgba(255,255,255,0.2);
  box-shadow: 0 8px 0 rgba(31,38,135,0.37);
  backdrop-filter: blur(7.2px); */
  border: 2px solid #4db5ff;
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;

  @media only screen and (max-width: 320px){
    width: 80vw;
    height: 90vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }

  @media only screen and (min-width: 321px){
    width: 80vw;
    height: 90vh;
    h4 {
      font-size: small;
    }
  }

  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }

  @media only screen and (min-width: 768px) {
    width: 70vw;
    height: 80vh;
  }

  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 70vh;
  }

  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 80vh;
  }
`

const WelcomeText = styled.h2`
  margin: 2.5rem 0;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 0.7rem;
  align-items: center;
  height: 20%;
  width: 100%;
`

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Btn = styled.button`
    font-size: large;
    width: max-content;
    display: inline-block;
    color: #4db5ff;
    padding: 0.75rem 1.2rem;
    border-radius: 0.4rem;
    cursor: pointer;
    border: 1px solid #4db5ff;
    transition: all 400ms ease;
    background: transparent;

    &:hover {
        background: #fff;
        color: #1f1f38;
        border-color: transparent;
    }
`

const LoginWith = styled.div`
  cursor: pointer;
`

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border: none;
  margin-top: 1.5rem;
  background: linear-gradient(to right, #4db5ff 0%, #03217b 75%);
  backdrop-filter: blur(25px);
`

const IconsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 2rem 0 3rem 0;
  width: 80%;
`

export default Auth