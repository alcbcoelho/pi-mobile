import { useContext } from 'react';
import { AppThemeContext } from '../contexts/AppThemeProvider';

export default function useAppTheme() {
	return useContext(AppThemeContext);
}
