import React from 'react';
import Link from 'next/link';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

import { HEADER_HEIGHT, TRANSITION } from '../../defines';

const Root = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 0 10px;
  height: 100%;

  .title {
    color: black;
  }

  &:hover {
    cursor: pointer;
  }
`;

const SubMenu = styled.div<{ open: boolean }>`
  position: absolute;
  background-color: #eee;
  top: ${HEADER_HEIGHT}px;
  right: 0px;
  border-radius: 10px;
  opacity: ${(props) => (props.open ? 1 : 0)};
  transition: opacity ${TRANSITION}ms ease;

  .item {
    display: flex;
    /* justify-content: flex-end; */
    width: 100%;
    margin: 0;
    padding: 10px 20px;
    white-space: nowrap;
    text-transform: uppercase;

    &:hover {
      background-color: #ddd;
    }
  }

  &.sub-menu-enter {
    opacity: 0;
    transition: opacity ${TRANSITION}ms ease;
  }
  &.sub-menu-enter-active {
    opacity: 1;
  }
  &.sub-menu-exit {
    opacity: 1;
  }
  &.sub-menu-exit-active {
    opacity: 0;
    transition: opacity ${TRANSITION}ms ease;
  }
`;

interface props {
  children: React.ReactChild;
  routeArray: string[];
  className?: string | undefined;
  subMenuArray?: string[];
}
const MenuItem: React.FC<props> = ({
  children,
  routeArray,
  className = '',
  subMenuArray = [],
  ...props
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <Root
      className={`${className} unselectable`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}>
      <Link href={routeArray[0]}>
        <a>
          <p className="title">{children}</p>
        </a>
      </Link>
      {subMenuArray.length >= 1 && (
        <CSSTransition
          in={open}
          timeout={TRANSITION}
          unmountOnExit
          classNames="sub-menu">
          <SubMenu className="subMenu" open={open}>
            {subMenuArray.map((subMenu, idx) => (
              <Link key={`subMenu-${subMenu}`} href={routeArray[idx + 1]}>
                <a>
                  <p className="item">{subMenu}</p>
                </a>
              </Link>
            ))}
          </SubMenu>
        </CSSTransition>
      )}
    </Root>
  );
};

export default MenuItem;
