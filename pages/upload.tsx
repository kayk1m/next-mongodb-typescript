import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import useSWR from 'swr';

import MemoForm from '../components/Form/MemoForm';

const Root = styled.div`
  padding-top: 100px;
`;

const UploadPage: React.FC = () => {
  const { mutate } = useSWR('/api/artwork');

  return (
    <>
      <Head>
        <title>Upload Memo</title>
      </Head>
      <Root>
        <MemoForm mutate={mutate} />
      </Root>
    </>
  );
};

export default UploadPage;
