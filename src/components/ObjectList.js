import { useEffect } from 'react';
import { View, FlatList, Image, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { Divider, Text, useTheme } from 'react-native-paper';
import endpoints from '../config/endpoints';

// Components
import CustomPressable from './CustomPressable';

// Hooks
import useAppTheme from '../hooks/useAppTheme';
import useUser from '../hooks/useUser';

// Styles
import { global } from '../styles/global';

export default function ObjectList({ navigation, foundObjects = false }) {
	const { height } = useWindowDimensions();
	const { userItems, getUserItems } = useUser();
	const controller = new AbortController();
	const defaultItemPhoto = `${endpoints.BASE_URL}${endpoints.PUBLIC_URL}/default-photo.jpg`;

	const { themeType, theme } = useAppTheme();

	const image = themeType === 'light' ? '../../assets/cross-light-theme.png' : '../../assets/cross-dark-theme.png';

	useEffect(() => {
		return () => controller.abort();
	}, []);

	return (
		<FlatList
			ListEmptyComponent={
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: height/1.4}}>
					{
						themeType === 'light'
						? <Image source={require('../../assets/cross-light-theme.png')} style={styles.crossImage} />
						: <Image source={require('../../assets/cross-dark-theme.png')} style={styles.crossImage} />
					}
					<Text style={[styles.message, { color: theme.colors.onSurfaceVariant, opacity: 0.65 }]}>
						{`Você não tem nenhum registro\nde objetos ${ foundObjects ? 'achados' : 'perdidos'}.`}
					</Text>
				</View>
			}
			data={
				foundObjects
					? userItems.filter((object) => object.situation === 'found')
					: userItems.filter((object) => object.situation === 'lost')
			}
			keyExtractor={(item) => item?.id}
			renderItem={({ item }) => (
				<CustomPressable
					onPress={() =>
						navigation.navigate('ObjectScreenRoutes', {
							screen: 'ObjectDetails',
							params: {
								foundObject: foundObjects,
								objectId: item?.id,
								fromLoggedUser: true,
							},
						})
					}
				>
					<View style={global.item}>
						<Image
							style={styles.thumbnail}
							source={{
								uri: item?.photos[0] === 'default-photo.jpg' ? defaultItemPhoto : item?.photos[0],
							}}
						/>
						<ScrollView>
							<Text variant='titleMedium'>
								{item?.brand
									? `${item?.objectType} ${item?.brand}`
									: `${item?.objectType} ${item?.color}`}
							</Text>
							<Text variant='labelMedium'>
								{`${foundObjects ? 'Achado' : 'Perdido'} em ${new Date(
									item?.datetime
								).toLocaleDateString('pt-BR')}, por volta das ${new Date(
									item?.datetime
								).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}, em ${
									item?.place
								}`}
							</Text>
						</ScrollView>
					</View>
					<Divider />
				</CustomPressable>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	thumbnail: { width: 50, height: 50, borderRadius: 2.5 },
	message: {
		textAlign: 'center',
		fontSize: 14,
		marginTop: 24
	},
	crossImage: {
		opacity: 0.7
	}
});
