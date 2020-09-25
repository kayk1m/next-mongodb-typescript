import React from 'react';
import styled from 'styled-components';

import Logo from '../Logo';
import MenuItem from './MenuItem';

import { TRANSITION_SHORT, SIDE_BAR_WIDTH } from '../../defines';

import IndexContext from '../../IndexContext';

interface RootProps {
  open: boolean;
}
const Root = styled.div<RootProps>`
  position: fixed;
  top: 0;
  right: ${(props) => (props.open ? 0 : -SIDE_BAR_WIDTH)}px;
  height: 100vh;
  width: ${SIDE_BAR_WIDTH}px;
  background-color: #eee;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) -3px 0 6px;
  transition: ${TRANSITION_SHORT}ms ease;
  z-index: 2;

  .divider {
    margin: 10px 0;
    padding: 0 2px;
    width: 100%;
    height: 0px;
    border-top: 1px solid #aaa;
  }

  .side-bar-title {
    display: flex;
    margin-top: 10px;
    width: 100%;
    justify-content: center;
  }
`;

const DarkBackground = styled.div<RootProps>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: ${(props) => (props.open ? 1 : 0)};
  transition: right ${TRANSITION_SHORT}ms ease,
    opacity ${TRANSITION_SHORT}ms ease;
  z-index: ${(props) => (props.open ? 1 : -1)};
`;

const FitLogo = styled(Logo)`
  width: fit-content;
`;

interface props {
  className?: string | undefined;
}
const SideBar: React.FC<props> = ({ className = '', ...props }) => {
  const { sideBarOpen, setSideBarOpen } = React.useContext(IndexContext);

  return (
    <>
      <DarkBackground
        open={sideBarOpen}
        onClick={() => {
          setSideBarOpen(false);
        }}
      />
      <Root open={sideBarOpen} className={`${className}`} {...props}>
        <div className="side-bar-title">
          <FitLogo />
        </div>
        <div className="divider" />
        <MenuItem title="Upload" href="/upload" />
      </Root>
    </>
  );
};

export default SideBar;
