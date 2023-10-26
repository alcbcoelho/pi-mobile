import 'react-native-gesture-handler';

import { useState, useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

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

	return (
		<SafeAreaProvider>
			<AppThemeProvider>
				<StatusBar barStyle={'light-content'} />
				{/* <SafeAreaView style={{ flex: 1, backgroundColor: 'blue' }}> */}
				{showSplashScreen ? <SplashScreen /> : <MainRoutes />}
				{/* </SafeAreaView> */}
			</AppThemeProvider>
		</SafeAreaProvider>
	);
}

{
	/* <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''} keyboardVerticalOffset={} style={{ flex: 1 }}>
	</KeyboardAvoidingView> */
}
