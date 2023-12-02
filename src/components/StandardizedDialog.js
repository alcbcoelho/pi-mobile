import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import { Button, Dialog, Portal, useTheme, Text } from 'react-native-paper';

// Services
import { removeItem } from '../services/objectService';

// Hooks
import useUser from '../hooks/useUser';

export default function StandardizedDialog({ title, content, visibilityStateArray, navigationArgs, deleteArgs }) {
	const { getUserItems } = useUser();
	const navigation = useNavigation();
	const route = useRoute();
	const theme = useTheme();

	return (
		<Portal>
			<Dialog
				visible={visibilityStateArray[0]}
				onDismiss={() => visibilityStateArray[1](false)}
				// contentContainerStyle={{ backgroundColor: theme.colors.background, padding: 16 }}
				style={{
					backgroundColor: theme.colors.background,
					padding: 8,
					height: '27.5%',
				}}
			>
				<Dialog.Title style={{ textAlign: 'center' }}>{title}</Dialog.Title>
				<Dialog.Content style={{ marginBottom: 0 }}>
					<Text style={global.message}>{content}</Text>
					<Dialog.Actions
						style={{
							marginTop: 16,
							justifyContent: 'space-evenly',
						}}
					>
						<Button onPress={() => visibilityStateArray[1](false)}>Não</Button>
						<Button
							onPress={async () => {
								visibilityStateArray[1](false);
								// navigation.navigate(...navigateArgsArray);

								if (deleteArgs) {
									const res = await removeItem(route.params.objectId);
									if (res === 204) {
										await getUserItems();
										navigation[navigationArgs.function](
											navigationArgs?.name,
											navigationArgs?.params
										);
									} else {
										Alert.alert('Não foi possível deletar o objeto!');
										console.log('resposta deleção', res);
									}
								} else {
									navigation[navigationArgs.function](navigationArgs?.name, navigationArgs?.params);
								}
							}}
						>
							Sim
						</Button>
					</Dialog.Actions>
				</Dialog.Content>
			</Dialog>
		</Portal>
	);
}
