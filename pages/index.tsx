import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import useSWR from 'swr';

import MemoListItem from '../components/MemoListItem';

import IndexContext from '../IndexContext';

const Root = styled.div`
  position: relative;
  padding-top: 100px;
  max-width: 800px;
  margin: 0 auto;

  .memo-list {
    display: flex;
    flex-wrap: wrap;
  }
`;

const IndexPage: React.FC = () => {
  const {
    isMobile,
    sideBarOpen,
    setSideBarOpen,
    headerOpen,
    setHeaderOpen,
  } = React.useContext(IndexContext);
  const { data: memos, error } = useSWR('/api/memo');

  return (
    <>
      <Head>
        <title>Kay Memo</title>
      </Head>
      <Root>
        <div>Hello World</div>
        <div>isMobile: {JSON.stringify(isMobile)}</div>
        <div>
          <button type="button" onClick={() => setSideBarOpen(!sideBarOpen)}>
            toggle SideBar(mobile only)
          </button>
        </div>
        <div>
          <button type="button" onClick={() => setHeaderOpen(!headerOpen)}>
            toggle Header
          </button>
        </div>
        <h5>Memo List</h5>
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          memos && (
            <div className="memo-list">
              {memos.map((memo: Memo) => (
                <MemoListItem memo={memo} key={`${memo.name}`} />
              ))}
            </div>
          )
        )}
      </Root>
    </>
  );
};

export default IndexPage;
