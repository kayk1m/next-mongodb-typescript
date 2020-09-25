import React from 'react';

interface ContextProps {
  isMobile: boolean;
  sideBarOpen: boolean;
  setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  headerOpen: boolean;
  setHeaderOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultContext: ContextProps = {
  isMobile: true,
  sideBarOpen: false,
  setSideBarOpen: () => false,
  headerOpen: true,
  setHeaderOpen: () => true,
};

export default React.createContext<ContextProps>(defaultContext);
