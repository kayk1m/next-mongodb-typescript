/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import ReactGA from 'react-ga';

// NEED TO CHANGE THIS
export const initGA = () => {
  ReactGA.initialize('UA-#########-#');
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};

export default { initGA, logEvent, logPageView, logException };
