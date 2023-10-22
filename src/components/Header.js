import React from 'react';
import { Appbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MaterialIcons } from '@expo/vector-icons';

// Hooks
import useAppTheme from '../hooks/useAppTheme';

// Styles
import { global } from '../styles/global';

export default function Header({ navigation, route, back, options }) {
	const { theme, toggleThemeType } = useAppTheme();
	const { top } = useSafeAreaInsets();

	return (
		<Appbar.Header elevated={true} safeAreaInsets={top}>
			{back || route.name !== 'Home' ? <Appbar.BackAction onPress={() => navigation.goBack()} /> : null}
			{/* Verificar lógica do botão de voltar */}
			<Appbar.Content title={options.title} />
			<Appbar.Action
				icon={() => (
					<MaterialIcons
						name='lightbulb'
						size={24}
						onPress={toggleThemeType}
						// onPress={() => {
						// 	console.log(options.title);
						// }}
					/>
				)}
			/>
			<Appbar.Action
				icon={() => <MaterialIcons name='menu' size={24} onPress={() => navigation.toggleDrawer()} />}
			/>
		</Appbar.Header>
	);
}
