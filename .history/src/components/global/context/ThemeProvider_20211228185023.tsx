import React, { createContext } from 'react';

type Theme = 'light' | 'dark';

export interface IThemeContext {
  theme: Theme;
  toggleTheme: () => void
}
export const ThemeContext = createContext<IThemeContext>({
  theme: 'light',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => {},
});

function ThemeProvider({ children }:{children: JSX.Element}):JSX.Element {
  const [theme, setTheme] = React.useState<Theme>(() => {
    if (!localStorage.getItem('theme')) return 'light';
    return localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
  });
  let toggleTheme = ():void => {
    setTheme((prevTheme) => {
      const t = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', t);
      return t;
    });
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
