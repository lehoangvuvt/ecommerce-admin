"use client";

import { ReactNode, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { usePathname } from "next/navigation";

const Container = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  flex-flow: row wrap;
`;

const Content = styled.div`
  height: 100%;
  flex: 1;
  background: rgba(0, 0, 0, 0.08);
  overflow-x: hidden;
  overflow-y: auto;
`;

type Props = {
  children: ReactNode;
};

const noSideBarRoutes: string[] = ["/product", "/product/new"];
const noHeaderRoutes: string[] = [];

const Layout = ({ children }: Props) => {
  const pathname = usePathname();

  return (
    <Container>
      {!noHeaderRoutes.includes(pathname) && <Header />}
      {!noSideBarRoutes.includes(pathname) && <Sidebar />}
      <Content>{children}</Content>
    </Container>
  );
};

export default Layout;
