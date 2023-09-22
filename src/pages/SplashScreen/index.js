import React from 'react';
import { Text, View } from 'react-native';

// Styles
import { global } from '../../styles/global';

export default function SplashScreen() {
	return (
		<View style={global.pageContainer}>
			<Text>SplashScreen</Text>
		</View>
	);
}
