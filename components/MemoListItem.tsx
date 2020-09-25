import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  width: fit-content;
  margin: 10px;
  padding: 15px 8px;
  border-radius: 10px;
  background-color: #eee;
  box-shadow: 3px 3px 0 3px rgba(0, 0, 0, 0.2);

  .memo-name,
  .memo-content {
    display: block;
    margin: 0;
  }
`;

interface props {
  memo: Memo;
  className?: string | undefined;
}
const MemoListItem: React.FC<props> = ({ memo, className = '', ...props }) => {
  return (
    <Root className={`${className} unselectable`} {...props}>
      <h4 className="memo-name">name: {memo.name}</h4>
      <p className="memo-content">content: {memo.content}</p>
    </Root>
  );
};

export default MemoListItem;
