import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  top: 50%;
  display: grid;
  align-content: center;
  justify-content: center;
  justify-items: center;
  grid-template-columns: 1;
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
const Recipe = styled.p`
  text-align: justify;
  width: 70%;
  margin: 20px;
`;

const Image = styled.img``;

const Modal = ({ closeModalFn }) => (
  <Wrapper>
    <Text>Details of the dish</Text>
    <Image
      src="https://picsum.photos/id/292/190/190"
      alt="Girl in a jacket"
      width="150"
      height="150"
    />
    <Recipe>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, ipsa
      tempore deleniti possimus inventore adipisci, nihil animi cupiditate
      recusandae nulla earum harum provident! Fugit atque accusamus eius, animi
      recusandae debitis mollitia velit, illo quos maiores veritatis vel saepe
      modi laudantium aliquid adipisci dolorum minima. Expedita nemo est dolorem
      eveniet.
    </Recipe>
    <button onClick={closeModalFn}> &#10799;</button>
  </Wrapper>
);

export default Modal;
