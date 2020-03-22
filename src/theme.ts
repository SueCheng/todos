export type ThemeProps = {
  space: number[];
  colors: {
    black: string;
    white: string;
    blue: string;
    navy: string;
  };
  breakpoints: string[];
};
export const theme: ThemeProps = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  colors: {
    black: '#f57e89',
    white: '#fff',
    blue: '#007ce0',
    navy: '#004175'
  },
  breakpoints: ['750px', '1000px', '1280px']
};
