import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import IconButton from '@material-ui/core/IconButton';
import Details from '@material-ui/icons/Details';

// import { TRANSITION } from '../../defines';

import IndexContext from '../../IndexContext';

const SUB_HEIGHT = 35;
const TRANSITION = 50;

const Root = styled.div`
  width: 100%;
  padding: 0 10px;

  .title {
    margin: 0;
    display: flex;
  }
`;

interface SubMenuProps {
  open: boolean;
  count: number;
}
const SubMenu = styled.div<SubMenuProps>`
  margin: 10px 0;
  width: 100%;
  height: ${(props) => (props.open ? props.count * SUB_HEIGHT : 0)}px;

  .item {
    color: black;
    padding: 5px 0;
    border-top: 1px solid #ddd;
    text-align: right;
  }

  &.sub-menu-enter {
    height: 0;
    transition: height ${TRANSITION}ms ease;
  }
  &.sub-menu-enter-active {
    height: ${(props) => props.count * SUB_HEIGHT}px;
  }
  &.sub-menu-exit {
    height: ${(props) => props.count * SUB_HEIGHT}px;
  }
  &.sub-menu-exit-active {
    height: 0;
    transition: height ${TRANSITION}ms ease;
  }
`;

const MyIconButton = styled(IconButton)<{ open: boolean }>`
  transform: rotate(${(props) => (props.open ? 180 : 0)}deg);
  transition: transform ${TRANSITION}ms ease;
`;

interface props {
  title: string;
  className?: string | undefined;
  href?: string;
  subMenuArray?: string[];
  routeArray?: string[];
}
const MenuItem: React.FC<props> = ({
  title,
  className = '',
  href = '/',
  subMenuArray = [],
  routeArray = [],
  ...props
}) => {
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);
  const [viewContent, setViewContent] = React.useState<boolean>(false);

  const { setSideBarOpen } = React.useContext(IndexContext);

  return (
    <Root
      className={`${className}`}
      onClick={() => {
        if (subMenuArray.length === 0) {
          router.push(href);
          setSideBarOpen(false);
        } else {
          setOpen(!open);
        }
      }}
      {...props}>
      <div className="title">
        <p>{title}</p>
        <div className="grow" />
        {subMenuArray.length >= 1 && (
          <MyIconButton className="detailsIcon" open={open}>
            <Details />
          </MyIconButton>
        )}
      </div>
      {subMenuArray.length >= 1 && (
        <CSSTransition
          in={open}
          timeout={TRANSITION}
          onEntered={() => {
            setViewContent(true);
          }}
          onExited={() => {
            setViewContent(false);
          }}
          unmountOnExit
          classNames="sub-menu">
          <SubMenu className="subMenu" open={open} count={subMenuArray.length}>
            {viewContent &&
              subMenuArray.map((subMenu, idx) => (
                <Link key={`subMenu-${subMenu}`} href={routeArray[idx]}>
                  <a>
                    <div
                      className="item"
                      role="button"
                      tabIndex={0}
                      onKeyDown={() => {}}
                      onClick={() => {
                        setSideBarOpen(false);
                      }}>
                      {subMenu}
                    </div>
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
