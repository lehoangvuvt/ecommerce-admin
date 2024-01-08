"use client";

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px 0px;
  z-index: 500;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.25);
`;

const Header = () => {
  return <Container>Header</Container>;
};

export default Header;
