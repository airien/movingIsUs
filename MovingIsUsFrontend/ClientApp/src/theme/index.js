import { createTheme } from '@mui/material/styles';

export const themeOptions = {
    palette: {
      type: 'light',
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#f50057',
      },
    },
  };
  export const theme = createTheme(themeOptions,
    {
      spacing : 4
    }
  );