import { useState, useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';

// Routes
import AppRoutes from './app.routes';

// Contexts
import AppThemeProvider from '../contexts/AppThemeContext';

// Pages
import SplashScreen from '../pages/SplashScreen';

export default function Routes() {
	const [showSplashScreen, setShowSplashScreen] = useState(true);

	useEffect(() => {
		setTimeout(() => setShowSplashScreen(false), 3000);
	}, []);

	return <AppThemeProvider>{showSplashScreen ? <SplashScreen /> : <AppRoutes />}</AppThemeProvider>;
}
