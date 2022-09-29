import React, { useState, useContext, ReactNode } from 'react';

import unicornTheme from '@marigold/theme-unicorn';
import b2bTheme from '@marigold/theme-b2b';
import coreTheme from '@marigold/theme-core';

const themes = {
  unicornTheme,
  b2bTheme,
  coreTheme,
} as const;

export type ThemeNames = keyof typeof themes;

// Context
// ---------------
export const Context = React.createContext({
  current: 'b2bTheme' as ThemeNames,
  themes,
  setCurrentTheme: (names: ThemeNames) => {},
});

// Hook
// ---------------
export const useThemeSwitch = () => useContext(Context);

// Component
// ---------------
export interface MarigoldThemeSwitchProps {
  children?: ReactNode;
}

export const AppThemeProvider = ({ children }: MarigoldThemeSwitchProps) => {
  const [current, setCurrentTheme] = useState<ThemeNames>('b2bTheme');

  return (
    <Context.Provider value={{ current, themes, setCurrentTheme }}>
      {children}
    </Context.Provider>
  );
};
