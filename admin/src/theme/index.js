import {createTheme} from '@material-ui/core/styles';
import {colors} from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createTheme({
    palette: {
        background: {
          default: '#F4F6F8',
          paper: colors.common.white
        },
        primary: {
          contrastText: '#ffffff',
          main: '#566456'
        },
        text: {
          primary: '#172b09',
          secondary: '#6b7726'
        }
      },
      shadows,
      typography
});

export default theme;