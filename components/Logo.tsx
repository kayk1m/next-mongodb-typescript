import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import IndexContext from '../IndexContext';

const Root = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

interface props {
  className?: string | undefined;
}
const Logo: React.FC<props> = ({ className = '', ...props }) => {
  const { sideBarOpen, setSideBarOpen } = React.useContext(IndexContext);

  return (
    <Link href="/">
      <Root
        className={`${className} unselectable`}
        onClick={() => {
          if (sideBarOpen) setSideBarOpen(false);
        }}
        {...props}>
        KAY EXAMPLE
      </Root>
    </Link>
  );
};

export default Logo;
