import React, { useCallback, useEffect, useMemo, useState } from 'react';

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('theme');
    if (typeof storedPrefs === 'string') {
      return storedPrefs;
    }

    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
    if (userMedia.matches) {
      return 'dark';
    }
  }

  return 'dark';
};

const defaultState = {
  theme: '',
  setTheme: () => undefined,
};

const ThemeContext = React.createContext(defaultState);

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  const rawSetTheme = useCallback((themeMode) => {
    const root = window.document.documentElement;
    const isDark = themeMode === 'dark';

    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(themeMode);

    localStorage.setItem('theme', themeMode);
  }, []);

  useEffect(() => {
    rawSetTheme(theme);
  }, [theme, rawSetTheme]);

  return (
    <ThemeContext.Provider
      value={useMemo(() => ({ theme, setTheme }), [theme])}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
