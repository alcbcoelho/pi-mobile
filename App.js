import "react-native-gesture-handler";

import { useState, useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

// Contexts
import AuthProvider from "./src/contexts/AuthContext";
import AppThemeProvider from "./src/contexts/AppThemeContext";
import DataMockupProvider from "./src/contexts/DataMockupContext";

// Routes
import MainRoutes from "./src/routes/MainRoutes";

// Pages
import SplashScreen from "./src/pages/SplashScreen";

export default function App() {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowSplashScreen(false), 3000);
  }, []);

  return (
    <SafeAreaProvider>
      <AppThemeProvider>
        <DataMockupProvider>
          <AuthProvider>
            <StatusBar barStyle={"light-content"} />
            {/* <SafeAreaView style={{ flex: 1, backgroundColor: 'blue' }}> */}
            {/* showSplashScreen ? <SplashScreen /> : */ <MainRoutes />}
            {/* </SafeAreaView> */}
          </AuthProvider>
        </DataMockupProvider>
      </AppThemeProvider>
    </SafeAreaProvider>
  );
}

{
  /* <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''} keyboardVerticalOffset={} style={{ flex: 1 }}>
	</KeyboardAvoidingView> */
}
