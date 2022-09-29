import { Box, MarigoldProvider } from '@marigold/components';
//import theme from '@marigold/theme-unicorn';

import Layout from './Layout/Layout';
import {
  AppThemeProvider,
  useThemeSwitch,
} from './components/ThemeMenuContext';

const App = () => {
  const { current, themes } = useThemeSwitch();
  return (
    <MarigoldProvider theme={themes[current]}>
      <Box
        css={{
          p: 'medium',
        }}
      >
        <Layout />
      </Box>
    </MarigoldProvider>
  );
};

const AppWithWrapper = () => (
  <AppThemeProvider>
    <App />
  </AppThemeProvider>
);

export default AppWithWrapper;
