import React from 'react';
import styled from 'styled-components';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import fetcher from '../../lib/fetcher';

const Root = styled.form`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  max-width: 800px;

  .submit-button {
    margin: 10px 0 10px auto;
    width: 100px;

    span.MuiButton-label {
      color: white;
    }
  }

  .response {
    margin: 10px 0;
  }
`;

const defaultMemo = {
  name: '',
  content: '',
};

interface props {
  className?: string | undefined;
  mutate?: (
    data?: unknown,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<unknown>;
}
const MemoForm: React.FC<props> = ({ className = '', mutate, ...props }) => {
  const [memo, setMemo] = React.useState<Memo>(defaultMemo);
  const [res, setRes] = React.useState<string>('');

  const handleSubmit = React.useCallback(async () => {
    if (!memo.name) {
      setRes('Name is Required.');
    } else {
      const response = await fetcher('/api/memo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memo),
      });
      const { error } = response;
      if (error) {
        setRes(error);
      } else {
        setRes('성공적으로 업로드하였습니다.');
        setMemo(defaultMemo);
        if (mutate) {
          mutate('/api/memo');
        }
      }
    }
  }, [memo, mutate]);

  return (
    <Root className={`${className}`} {...props}>
      <TextField
        label="name"
        name="name"
        type="text"
        placeholder="Kay Kim"
        value={memo.name}
        onChange={(e) => {
          setMemo({
            ...memo,
            name: e.target.value,
          });
        }}
        inputProps={{
          maxLength: 30,
          required: true,
        }}
      />
      <TextField
        label="content"
        name="content"
        type="text"
        placeholder="Don't forget to buy milk!!!"
        multiline
        value={memo.content}
        onChange={(e) => {
          setMemo({
            ...memo,
            content: e.target.value,
          });
        }}
        inputProps={{
          maxLength: 500,
          rows: 5,
        }}
      />
      <Button
        className="submit-button"
        variant="contained"
        color="primary"
        onClick={() => handleSubmit()}>
        Submit
      </Button>
      <div className="response">{res}</div>
    </Root>
  );
};

export default MemoForm;
