import { useCallback, useContext } from 'react';

import { ThemeContext } from '../context/ThemeProvider';

const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = useCallback(() => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, [theme, setTheme]);

  return { theme, toggleTheme };
};

export default useTheme;
