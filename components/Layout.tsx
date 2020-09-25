import React from 'react';
import styled from 'styled-components';
import isMobile from 'is-mobile';

import Header from './Header/Header';
import SideBar from './SideBar/SideBar';

import IndexContext from '../IndexContext';

const Root = styled.div`
  position: relative;
  min-height: 100%;
  min-width: 100%;

  .main {
    min-width: 100%;
    min-height: 100%;
  }
`;

interface props {
  children: React.ReactChild;
  className?: string | undefined;
}
const Layout: React.FC<props> = ({ children, className = '', ...props }) => {
  const [headerOpen, setHeaderOpen] = React.useState<boolean>(true);
  const [sideBarOpen, setSideBarOpen] = React.useState<boolean>(false);

  return (
    <IndexContext.Provider
      value={{
        isMobile: isMobile(),
        sideBarOpen,
        setSideBarOpen,
        headerOpen,
        setHeaderOpen,
      }}>
      <Root className={`${className}`} {...props}>
        <Header />
        {isMobile() && <SideBar />}
        <div className="main">{children}</div>
      </Root>
    </IndexContext.Provider>
  );
};

export default Layout;
