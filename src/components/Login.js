import React from "react";
import styled from "styled-components";

const LoginWrapper = styled.div`
  display: grid;
  justify-items: center;
`;

const Login = ({ ...props }) => {
  return (
    <LoginWrapper>
      <h1>Let's Eat</h1>
      <p>Log in to see the guest list and add your recipes!</p>
      <button onClick={props.onClick}>Log In with Google</button>
    </LoginWrapper>
  );
};

export default Login;
