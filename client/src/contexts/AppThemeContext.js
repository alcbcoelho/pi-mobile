import { useState, createContext, useMemo, useCallback } from 'react';
import { useColorScheme } from 'react-native';

import {
	PaperProvider,
	adaptNavigationTheme,
	MD3LightTheme as PaperDefaultTheme,
	MD3DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

import {
	NavigationContainer,
	DefaultTheme as NavigationDefaultTheme,
	DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

const appDefaultTheme = {
	...NavigationDefaultTheme,
	...PaperDefaultTheme,
	colors: {
		...NavigationDefaultTheme.colors,
		...PaperDefaultTheme.colors,
		primary: 'rgb(147, 75, 0)',
		onPrimary: 'rgb(255, 255, 255)',
		primaryContainer: 'rgb(255, 220, 197)',
		onPrimaryContainer: 'rgb(48, 20, 0)',
		secondary: 'rgb(159, 62, 63)',
		onSecondary: 'rgb(255, 255, 255)',
		secondaryContainer: 'rgb(255, 218, 216)',
		onSecondaryContainer: 'rgb(65, 0, 6)',
		tertiary: 'rgb(94, 97, 53)',
		onTertiary: 'rgb(255, 255, 255)',
		tertiaryContainer: 'rgb(227, 230, 175)',
		onTertiaryContainer: 'rgb(27, 29, 0)',
		error: 'rgb(186, 26, 26)',
		onError: 'rgb(255, 255, 255)',
		errorContainer: 'rgb(255, 218, 214)',
		onErrorContainer: 'rgb(65, 0, 2)',
		background: 'rgb(255, 251, 255)',
		onBackground: 'rgb(32, 26, 23)',
		surface: 'rgb(255, 251, 255)',
		onSurface: 'rgb(32, 26, 23)',
		surfaceVariant: 'rgb(243, 223, 210)',
		onSurfaceVariant: 'rgb(82, 68, 59)',
		outline: 'rgb(132, 116, 106)',
		outlineVariant: 'rgb(214, 195, 183)',
		shadow: 'rgb(0, 0, 0)',
		scrim: 'rgb(0, 0, 0)',
		inverseSurface: 'rgb(54, 47, 43)',
		inverseOnSurface: 'rgb(251, 238, 232)',
		inversePrimary: 'rgb(255, 183, 130)',
		elevation: {
			level0: 'transparent',
			level1: 'rgb(250, 242, 242)',
			level2: 'rgb(246, 237, 235)',
			level3: 'rgb(243, 232, 227)',
			level4: 'rgb(242, 230, 224)',
			level5: 'rgb(240, 226, 219)',
		},
		surfaceDisabled: 'rgba(32, 26, 23, 0.12)',
		onSurfaceDisabled: 'rgba(32, 26, 23, 0.38)',
		backdrop: 'rgba(58, 46, 38, 0.4)',
	},
};

const appDarkTheme = {
	...NavigationDarkTheme,
	...PaperDarkTheme,
	colors: {
		...NavigationDarkTheme,
		...PaperDarkTheme,
		primary: 'rgb(255, 183, 130)',
		onPrimary: 'rgb(79, 37, 0)',
		primaryContainer: 'rgb(112, 56, 0)',
		onPrimaryContainer: 'rgb(255, 220, 197)',
		secondary: 'rgb(255, 179, 176)',
		onSecondary: 'rgb(98, 16, 22)',
		secondaryContainer: 'rgb(128, 39, 42)',
		onSecondaryContainer: 'rgb(255, 218, 216)',
		tertiary: 'rgb(199, 202, 149)',
		onTertiary: 'rgb(48, 51, 11)',
		tertiaryContainer: 'rgb(70, 73, 32)',
		onTertiaryContainer: 'rgb(227, 230, 175)',
		error: 'rgb(255, 180, 171)',
		onError: 'rgb(105, 0, 5)',
		errorContainer: 'rgb(147, 0, 10)',
		onErrorContainer: 'rgb(255, 180, 171)',
		background: 'rgb(32, 26, 23)',
		onBackground: 'rgb(236, 224, 218)',
		surface: 'rgb(32, 26, 23)',
		onSurface: 'rgb(236, 224, 218)',
		surfaceVariant: 'rgb(82, 68, 59)',
		onSurfaceVariant: 'rgb(214, 195, 183)',
		outline: 'rgb(159, 141, 131)',
		outlineVariant: 'rgb(82, 68, 59)',
		shadow: 'rgb(0, 0, 0)',
		scrim: 'rgb(0, 0, 0)',
		inverseSurface: 'rgb(236, 224, 218)',
		inverseOnSurface: 'rgb(54, 47, 43)',
		inversePrimary: 'rgb(147, 75, 0)',
		elevation: {
			level0: 'transparent',
			level1: 'rgb(43, 34, 28)',
			level2: 'rgb(50, 39, 32)',
			level3: 'rgb(57, 43, 35)',
			level4: 'rgb(59, 45, 36)',
			level5: 'rgb(63, 48, 38)',
		},
		surfaceDisabled: 'rgba(236, 224, 218, 0.12)',
		onSurfaceDisabled: 'rgba(236, 224, 218, 0.38)',
		backdrop: 'rgba(58, 46, 38, 0.4)',
	},
};

export const AppThemeContext = createContext();

export default function AppThemeProvider({ children }) {
	const colorScheme = useColorScheme();

	const [themeType, setThemeType] = useState(colorScheme || 'light');

	const toggleThemeType = useCallback(() => {
		setThemeType((previus) => (previus === 'dark' ? 'light' : 'dark'));
	}, []);

	const isDarkTheme = useMemo(() => themeType === 'dark', [themeType]);

	const theme = useMemo(() => (isDarkTheme ? appDarkTheme : appDefaultTheme), [isDarkTheme]);

	return (
		<PaperProvider theme={theme}>
			<NavigationContainer theme={theme}>
				<AppThemeContext.Provider value={{ isDarkTheme, theme, themeType, setThemeType, toggleThemeType }}>
					{children}
				</AppThemeContext.Provider>
			</NavigationContainer>
		</PaperProvider>
	);
}