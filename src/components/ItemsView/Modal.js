import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  width: 40vw;
  height: 70vh;
  background-color: white;
  border-color: #bbbbbb;
  box-shadow: 0 20px 40px -10px rgba(129, 129, 129, 0.5);
  position: fixed;
`;

const Text = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: black;
`;

const Modal = ({ closeModalFn }) => (
  <Wrapper>
    <Text>Details of the dish</Text>
    <button onClick={closeModalFn}> &#10799;</button>
  </Wrapper>
);

export default Modal;
