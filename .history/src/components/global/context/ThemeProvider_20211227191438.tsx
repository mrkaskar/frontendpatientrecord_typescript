import React, { createContext } from 'react';

type Theme = 'light' | 'dark';

export interface IThemeContext {
  theme: Theme;
  toggleTheme: () => null
}
export const ThemeContext = createContext<IThemeContext>({
  theme: 'light',
  toggleTheme: () => null,
});

function ThemeProvider({ children }:{children: JSX.Element}):JSX.Element {
  const [theme, setTheme] = React.useState<Theme>(() => (localStorage.getItem('theme') === 'light' ? 'light' : 'dark'));
  let toggleTheme = ():null => {
    setTheme((prevTheme) => {
      let t = prevTheme === 'light' ? 'dark' : 'light'; 
      localStorage.setItem('theme', t);
      return t; 
    }
    return null;
  };
  toggleTheme = React.useCallback(toggleTheme, []);

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
