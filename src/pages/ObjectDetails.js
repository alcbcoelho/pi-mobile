import { useState, useEffect } from 'react';
import { View, Image, ScrollView, FlatList, useWindowDimensions } from 'react-native';
import { Button, Chip, Dialog, Divider, FAB, List, Portal, Text, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import endpoints from '../config/endpoints';

// Components
import PrimaryFAB from '../components/PrimaryFAB';

// Services
import { findItemById, removeItem } from '../services/objectService';

// Hooks
import useUser from '../hooks/useUser';
import useAppTheme from '../hooks/useAppTheme';

// Styles
import { global } from '../styles/global';
import { Alert } from 'react-native';

export default function ObjectDetails({ navigation, route }) {
	const theme = useTheme();
	const { themeType } = useAppTheme();
	const { width } = useWindowDimensions();
	const { userData, userItems, getUserItems } = useUser();

	const [item, setItem] = useState();
	const [dialogVisibility, setDialogVisibility] = useState(false);
	const controller = new AbortController();
	const defaultItemPhoto = `${endpoints.BASE_URL}${endpoints.PUBLIC_URL}/default-photo.jpg`;
	const defaultUserAvatar = `${endpoints.BASE_URL}${endpoints.PUBLIC_URL}/default-avatar.jpg`;

	useEffect(() => {
		const searchForItem = async () => {
			if (route.params.fromLoggedUser) {
				setItem(userItems.find((item) => item.id === route.params.objectId));
			} else {
				const itemFoundById = await findItemById(route.params.objectId);
				setItem(itemFoundById);
			}
		};
		searchForItem();
		return () => controller.abort();
	}, [route.params?.objectId]);

	return (
		<>
			<Portal>
				<Dialog
					visible={dialogVisibility}
					onDismiss={() => setDialogVisibility(false)}
					// contentContainerStyle={{ backgroundColor: theme.colors.background, padding: 16 }}
					style={{
						backgroundColor: theme.colors.background,
						padding: 8,
						height: '27.5%',
					}}
				>
					<Dialog.Title style={{ textAlign: 'center' }}>Apagar Registro</Dialog.Title>
					<Dialog.Content style={{ marginBottom: 0 }}>
						<Text style={global.message}>Tem certeza que deseja apagar esse objeto?</Text>
						<Dialog.Actions
							style={{
								marginTop: 16,
								justifyContent: 'space-evenly',
							}}
						>
							<Button onPress={() => setDialogVisibility(false)}>Não</Button>
							<Button
								onPress={async () => {
									setDialogVisibility(false);
									const res = await removeItem(route.params.objectId);
									if (res === 204) {
										await getUserItems();
										navigation.navigate('MyObjects', {
											foundObject: route.params.foundObject,
											objectId: route.params.objectId,
											objectDeleted: true,
											objectRemovedName: userItems.find(
												(item) => item.id === route.params.objectId
											).objectType,
										});
									} else {
										Alert.alert('Não foi possível deletar o objeto!');
										console.log('resposta deleção', res);
									}
								}}
							>
								Sim
							</Button>
						</Dialog.Actions>
					</Dialog.Content>
				</Dialog>
			</Portal>
			<ScrollView>
				<View style={[global.pageContainer, { justifyContent: 'flex-start', height: '100%' }]}>
					<FlatList
						ListEmptyComponent={() => (
							<View
								style={[
									global.imagePlaceholder,
									{
										width,
										height: width,
										flex: 1,
										backgroundColor:
											themeType === 'light'
												? 'rgba(147, 75, 0, 0.15)'
												: 'rgba(255, 183, 130, 0.15)',
									},
								]}
							>
								<Ionicons
									name='american-football'
									size={width * 0.75}
									color={theme.colors.background}
								/>
							</View>
						)}
						data={item?.photos}
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						alwaysBounceHorizontal={false}
						bounces={false}
						directionalLockEnabled={true}
						pagingEnabled={true}
						renderItem={({ photo, index }) => (
							<View key={index} style={{ width, height: width }}>
								<Image
									style={{ width, height: '100%' }}
									source={{
										uri:
											item?.photos[0] === 'default-photo.jpg'
												? defaultItemPhoto
												: item?.photos[0],
									}}
								/>
							</View>
						)}
					/>
					<View style={global.objectTags}>
						{item?.objectType ? <Chip mode='outlined'>{item?.objectType}</Chip> : null}
						{item?.brand ? <Chip mode='outlined'>{item?.brand}</Chip> : null}
						{item?.model ? <Chip mode='outlined'>{item?.model}</Chip> : null}
						{item?.color ? <Chip mode='outlined'>{item?.color}</Chip> : null}
						{item?.characteristics.length !== 0
							? item?.characteristics.map((characteristic, index) => (
									<Chip key={index} mode='outlined'>
										{characteristic}
									</Chip>
							  ))
							: null}
					</View>
					<View style={global.objectSpecs}>
						<List.Item
							style={global.objectItemSpec}
							title={`${route.params.foundObject ? 'Achado' : 'Perdido'} por ${
								userData?.firstName + ' ' + userData.lastName
							}`}
							left={(props) => (
								<List.Icon
									{...props}
									// icon='account-circle-outline'
									icon={({ size }) => (
										<Image
											source={{
												uri:
													userData?.avatar === 'default-avatar.jpg'
														? defaultUserAvatar
														: userData?.avatar,
											}}
											style={{
												width: size,
												height: size,
												aspectRatio: 1 / 1,
												borderRadius: 256,
											}}
										/>
									)}
								/>
							)}
						/>
						<List.Item
							style={global.objectItemSpec}
							title={`${new Date(item?.datetime).toLocaleDateString('pt-BR')}`}
							left={(props) => (
								<List.Icon
									{...props}
									// icon='calendar-month-outline'
									icon={({ size, color }) => (
										<Ionicons name='calendar-outline' size={size} color={color} />
									)}
								/>
							)}
						/>
						<List.Item
							style={global.objectItemSpec}
							title={`${route.params.foundObject ? 'Às' : 'Por volta das'} ${new Date(
								item?.datetime
							).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`}
							left={(props) => (
								<List.Icon
									{...props}
									// icon='clock-outline'
									icon={({ size, color }) => (
										<Ionicons name='time-outline' size={size} color={color} />
									)}
								/>
							)}
						/>
						<List.Item
							style={global.objectItemSpec}
							title={item?.place}
							left={(props) => (
								<List.Icon
									{...props}
									// icon='map-marker-outline'
									icon={({ size, color }) => (
										<Ionicons name='location-outline' size={size} color={color} />
									)}
								/>
							)}
						/>
						<Divider style={{ marginTop: 16 }} />
					</View>
					<View style={global.objectInfo}>
						{item?.info ? (
							<Text style={global.objectInfoText}>{item?.info}</Text>
						) : (
							<Text style={global.objectInfoText}>Informações adicionais não foram especificadas!</Text>
						)}
					</View>
				</View>
			</ScrollView>
			<View style={[global.fabButton, { gap: 16 }]}>
				<PrimaryFAB
					icon='pencil-outline'
					onPress={() => {
						navigation.navigate('ObjectScreenRoutes', {
							screen: 'ObjectEdit',
							params: {
								foundObject: route.params.foundObject,
								objectId: route.params.objectId,
							},
						});
					}}
				/>
				<FAB
					icon='trash-can-outline'
					color={'white'}
					// color={theme.colors.onError}
					style={{ backgroundColor: 'rgb(186, 26, 26)' }}
					// style={{ backgroundColor: theme.colors.error }}
					onPress={() => setDialogVisibility(true)}
				/>
			</View>
		</>
	);
}
