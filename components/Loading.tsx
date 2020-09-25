import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;

  img {
    width: 100px;
    height: 100px;
  }
`;

const FullRoot = styled(Root)`
  grid-row: 1 / 3;
  grid-column: 1 / 3;
  width: 100vw;
  height: 100vh;
`;

interface Props {
  full?: boolean;
  children?: React.ReactNode;
}
const Loading: React.FC<Props> = ({ full = false, children, ...props }) => {
  if (!full) {
    return (
      <Root {...props}>
        {children ?? <img alt="loading..." src="/images/loading.gif" />}
      </Root>
    );
  }
  return (
    <FullRoot {...props}>
      {children ?? <img alt="loading..." src="/images/loading.gif" />}
    </FullRoot>
  );
};

export default Loading;
