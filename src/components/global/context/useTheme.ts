import { useContext } from 'react';
import { ThemeContext, IThemeContext } from './ThemeProvider';

function useTheme(): IThemeContext {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return { theme, toggleTheme };
}

export default useTheme;
