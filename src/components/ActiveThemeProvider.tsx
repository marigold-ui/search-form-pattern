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
const Context = React.createContext({
  current: 'b2bTheme' as ThemeNames,
  themes,
  setActiveTheme: (_: ThemeNames) => {},
});

export const ActiveThemeConsumer = Context.Consumer;

// Hook
// ---------------
export const useActiveTheme = () => useContext(Context);

// Component
// ---------------
export interface MarigoldThemeSwitchProps {
  children?: ReactNode;
}

export const ActiveThemeProvider = ({ children }: MarigoldThemeSwitchProps) => {
  const [current, setActiveTheme] = useState<ThemeNames>('b2bTheme');

  return (
    <Context.Provider value={{ current, themes, setActiveTheme }}>
      {children}
    </Context.Provider>
  );
};
