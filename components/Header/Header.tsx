import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/icons/Menu';

import Logo from '../Logo';
import MenuItem from './MenuItem';

import { HEADER_HEIGHT, MOBILE_HEADER_HEIGHT, TRANSITION } from '../../defines';

import IndexContext from '../../IndexContext';

interface RootProps {
  isMobile: boolean;
}
const Root = styled.div<RootProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: ${(props) =>
    props.isMobile ? MOBILE_HEADER_HEIGHT : HEADER_HEIGHT}px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0 3px 6px;
  z-index: 1;

  .headerContent {
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0 auto;
    padding: 0 20px;
    max-width: 2000px;
  }

  &.header-enter {
    top: -${(props) => (props.isMobile ? MOBILE_HEADER_HEIGHT : HEADER_HEIGHT)}px;
  }
  &.header-enter-active {
    top: 0;
    transition: ${TRANSITION}ms ease;
  }
  &.header-exit {
    top: 0;
  }
  &.header-exit-active {
    top: -${(props) => (props.isMobile ? MOBILE_HEADER_HEIGHT : HEADER_HEIGHT)}px;
    transition: ${TRANSITION}ms ease;
  }
`;

interface props {
  className?: string | undefined;
}
const Header: React.FC<props> = ({ className = '', ...props }) => {
  const {
    isMobile,
    sideBarOpen,
    setSideBarOpen,
    headerOpen,
  } = React.useContext(IndexContext);

  return (
    <CSSTransition
      in={headerOpen}
      timeout={TRANSITION}
      unmountOnExit
      classNames="header">
      <Root isMobile={isMobile} className={`${className}`} {...props}>
        <div className="headerContent">
          <Logo />
          <div className="grow" />
          {isMobile ? (
            <IconButton onClick={() => setSideBarOpen(!sideBarOpen)}>
              <Menu />
            </IconButton>
          ) : (
            <MenuItem routeArray={['/upload']}>Upload</MenuItem>
          )}
        </div>
      </Root>
    </CSSTransition>
  );
};

export default Header;
