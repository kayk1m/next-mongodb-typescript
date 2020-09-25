export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const DB_URI = process.env.MONGODB_URI;
export const DB_NAME = process.env.MONGODB_NAME;

export const MOBILE_BREAKPOINT = 500;
export const TABLET_BREAKPOINT = 800;
export const NAVBAR_WIDTH = 225;

export const HEADER_HEIGHT = 65;
export const MOBILE_HEADER_HEIGHT = 53;
export const SIDE_BAR_WIDTH = 300;
export const TRANSITION = 500;
export const TRANSITION_SHORT = 300;

export const MOBILE_GAP = 3;
export const DESKTOP_GAP = 20;
export const CONTAINER_WIDTH = 900;

export const COLORS = {
  primary: '#17babc',
  disabled: '#7d7d7d',
};

const DEFINES = {
  API_URL,
  DB_URI,
  DB_NAME,
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
  NAVBAR_WIDTH,
  HEADER_HEIGHT,
  MOBILE_HEADER_HEIGHT,
  SIDE_BAR_WIDTH,
  TRANSITION,
  TRANSITION_SHORT,
  MOBILE_GAP,
  DESKTOP_GAP,
  CONTAINER_WIDTH,
  COLORS,
};

export default DEFINES;
