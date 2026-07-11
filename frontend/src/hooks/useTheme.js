import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme as toggleThemeAction } from '../store/themeSlice';

export const useTheme = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    dispatch(toggleThemeAction());
  };

  return { isDarkMode, toggleTheme };
};
