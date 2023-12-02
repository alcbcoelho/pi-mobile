import { useCallback, useState } from 'react';
import { Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Appbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

// Components
import StandardizedDialog from './StandardizedDialog';

// Hooks
import useAppTheme from '../hooks/useAppTheme';

export default function Header({ navigation, route, back, options }) {
	const [dialogVisibility, setDialogVisibility] = useState();

	const { theme, toggleThemeType, themeType } = useAppTheme();
	const { top } = useSafeAreaInsets();

	function handleOnPress() {
		if (route.params?.unsavedChanges) {
			Keyboard.dismiss();
			setDialogVisibility(true);
		} else navigation.goBack();
	}

	return (
		<>
			<Appbar.Header style={{ backgroundColor: '#946D51' }} elevated={true} safeAreaInsets={top}>
				{back || route.name !== 'Home' ? <Appbar.BackAction color={'#fff'} onPress={handleOnPress} /> : null}
				<Appbar.Content title={options.title} titleStyle={{ color: '#fff' }} />
				<Appbar.Action
					icon={useCallback(
						() => (
							<Ionicons
								name={themeType === 'dark' ? 'moon' : 'moon-outline'}
								color='#fff'
								size={24}
								onPress={toggleThemeType}
							/>
						),
						[themeType]
					)}
				/>
				{!options.hideDrawerMenu && (
					<Appbar.Action
						icon={useCallback(
							() => (
								<Ionicons
									name='menu-outline'
									color='#fff'
									size={24}
									onPress={() => navigation.toggleDrawer()}
								/>
							),
							[]
						)}
					/>
				)}
			</Appbar.Header>
			<StandardizedDialog
				title='Edições não salvas'
				content='Um ou mais campos foram editados. Deseja retornar mesmo assim e descartar as edições?'
				visibilityStateArray={[dialogVisibility, setDialogVisibility]}
				navigationArgs={{
					function: 'goBack',
				}}
			/>
		</>
	);
}
