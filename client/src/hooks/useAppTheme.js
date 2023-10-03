import { useContext } from 'react';
import { AppThemeContext } from '../contexts/AppThemeContext';

export default function useAppTheme() {
	return useContext(AppThemeContext);
}
