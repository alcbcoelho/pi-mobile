import 'react-native-gesture-handler';

import { useState, useEffect } from 'react';

// Contexts
import AppThemeProvider from './src/contexts/AppThemeContext';

// Routes
import MainRoutes from './src/routes/MainRoutes';

// Pages
import SplashScreen from './src/pages/SplashScreen';

export default function App() {
	const [showSplashScreen, setShowSplashScreen] = useState(true);

	useEffect(() => {
		setTimeout(() => setShowSplashScreen(false), 3000);
	}, []);

	return <AppThemeProvider>{showSplashScreen ? <SplashScreen /> : <MainRoutes />}</AppThemeProvider>;
}
