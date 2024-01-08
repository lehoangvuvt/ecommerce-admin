"use client";

import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

const Form = styled.form``;

const MyForm: React.FC<Props> = ({ children }) => {
  return <Form>{children}</Form>;
};

export default MyForm;
