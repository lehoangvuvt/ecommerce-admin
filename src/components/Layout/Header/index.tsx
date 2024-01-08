"use client";

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background: red;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px 0px;
  z-index: 1000;
`;

const Header = () => {
  return <Container>Header</Container>;
};

export default Header;
