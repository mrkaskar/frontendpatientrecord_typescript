import React, { createContext } from 'react';

type Theme = 'light' | 'dark';

export interface IThemeContext {
  theme: Theme;
  toggleTheme?: () => void;
}

export const ThemeContext = createContext<IThemeContext>({ theme: 'light' });

function ThemeProvider({ children }:{children: JSX.Element}):JSX.Element {
  const [theme, setTheme] = React.useState<Theme>('light');
  const toggleTheme = (): void => setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
