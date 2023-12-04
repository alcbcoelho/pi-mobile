import { useEffect, useState } from 'react';
import { View, FlatList, Image, ScrollView } from 'react-native';
import { ActivityIndicator, Divider, Text } from 'react-native-paper';
import endpoints from '../config/endpoints';

// Services
import { findItemById } from '../services/objectService';
import { triggerMatchSearch } from '../services/notificationServices';

// Components
import CustomPressable from './CustomPressable';

// Hooks
import useUser from '../hooks/useUser';

// Styles
import { global } from '../styles/global';

export default function NotificationList({ navigation, allNotifications = false }) {
	// const [userObjectsInMatches, setUserObjectsInMatches] = useState([]);
	const [othersObjectsInMatches, setOthersObjectsInMatches] = useState([]);
	// const [completeObjectsInMatches, setCompleteObjectsInMatches] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const { userItems, userMatches, getUserMatches } = useUser();
	const controller = new AbortController();
	const defaultItemPhoto = `${endpoints.BASE_URL}${endpoints.PUBLIC_URL}/default-photo.jpg`;

	// console.log('complete', completeObjectsInMatches);
	console.log('ESTADO OBJETO DE OUTROS:', othersObjectsInMatches);

	useEffect(() => {
		const loadMatchData = async () => {
			const userObjectsWithMatch = []; // está armazenando os objeto completos do usuário
			const otherObjectsWithMatch = []; // a princípio está armazenando os ids dos outros objetos, depois recebe os objetos completos de outros
			const completeObjectsUserOther = [];

			for (let i = 0; i < userMatches.length; i++) {
				for (let j = 0; j < userItems.length; j++) {
					const hasId = userMatches[i].itemIds.indexOf(userItems[j].id);
					if (hasId === -1) continue
					if (hasId === 0) otherObjectsWithMatch.push(userMatches[i].itemIds[1]);
					if (hasId === 1) otherObjectsWithMatch.push(userMatches[i].itemIds[0]);
					userObjectsWithMatch.push(userItems[j]);
				}
			}

			console.log('OBJETOS DO USUÁRIO:', userObjectsWithMatch);
			console.log('OBJETOS DE OUTROS (IDS):', otherObjectsWithMatch);

			otherObjectsWithMatch = otherObjectsWithMatch.map(async (id) => {
				const othersObject = await findItemById(id);
				if (othersObject.id) return othersObject; // está substituindo os ids pelos objetos completos dos outros
			});

			// for (let k = 0; k < otherObjectsWithMatch.length; k++) {
			// 	const othersObject = await findItemById(otherObjectsWithMatch[k]);
			// 	if (othersObject.id) otherObjectsWithMatch[k] = othersObject; // está substituindo os ids pelos objetos completos de outros
			// }

			console.log('OBJETOS DE OUTROS (COMPLETOS):', otherObjectsWithMatch);

			for (let l = 0; l < userObjectsWithMatch.length; l++) {
				completeObjectsUserOther.push([userObjectsWithMatch[l], otherObjectsWithMatch[l]]);
			}

			// setUserObjectsInMatches(userObjectsWithMatch);
			setOthersObjectsInMatches(otherObjectsWithMatch);
			// setCompleteObjectsInMatches(completeObjectsUserOther);
		};

		loadMatchData();
		if (userItems.length) setIsLoading(false);
		return () => controller.abort();
	}, [userMatches]);

	useEffect(() => {
		const launchMatchesSearch = async () => {
			await triggerMatchSearch(); // Busca por novas possíveis correspondências
			await getUserMatches(); // Atualiza o estado global "userMatches"
		};

		launchMatchesSearch();
		return () => controller.abort();
	}, []);

	return (
		<>
			{isLoading ? (
				<View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
					<ActivityIndicator animating={true} size={'large'} />
				</View>
			) : (
				<FlatList
					// data={
					// 	allNotifications
					// 		? userMatches.filter((match ou object) => match ou object .solved === false)
					// 		: userMatches.filter((match ou object) => match ou object .solved === true)
					// }
					// data={completeObjectsInMatches}
					data={othersObjectsInMatches}
					keyExtractor={(othersObject) => othersObject.id}
					renderItem={({ othersObject }) => (
						<CustomPressable
							onPress={() =>
								navigation.navigate('ObjectScreenRoutes', {
									screen: 'ObjectDetails',
									params: {
										allNotifications: allNotifications,
										othersObjectId: othersObject?.id,
										fromLoggedUser: false,
									},
								})
							}
						>
							<View style={global.item}>
								<Image
									style={{ width: 50, height: 50, borderRadius: 2.5 }}
									source={{
										uri:
											othersObject?.photos[0] === 'default-photo.jpg'
												? defaultItemPhoto
												: othersObject?.photos[0],
									}}
								/>
								<ScrollView>
									<Text variant='titleMedium'>
										Possível correspondência para um de seus objetos!
									</Text>
									<Text variant='labelMedium'>
										{othersObject?.brand
											? `${othersObject?.objectType} ${othersObject?.brand}`
											: `${othersObject?.objectType} ${othersObject?.color}`}
										, corresponde ao seu objeto?
									</Text>
								</ScrollView>
							</View>
							<Divider />
						</CustomPressable>
					)}
				/>
			)}
		</>
	);
}

// import { View, FlatList, Image, ScrollView } from 'react-native';
// import { Divider, Text } from 'react-native-paper';
// import CustomPressable from './CustomPressable';

// // Data
// import { unreadNotifications, allNotifications as allNotifications_ } from '../mockup/NotificationsData';

// // Styles
// import { global } from '../styles/global';

// export default function NotificationList({ navigation, allNotifications = false }) {
// 	return (
// 		<FlatList
// 			data={allNotifications ? allNotifications_ : unreadNotifications}
// 			keyExtractor={(item) => item.id}
// 			renderItem={({ item }) => (
// 				<CustomPressable
// 					onPress={() =>
// 						navigation.navigate('ObjectScreenRoutes', {
// 							screen: 'ObjectDetails',
// 						})
// 					}
// 				>
// 					<View style={global.item}>
// 						<Image style={{ width: 50, height: 50, borderRadius: 2.5 }} source={{ uri: item.imgUrl }} />
// 						<ScrollView>
// 							<Text variant='titleMedium'>{item.title}</Text>
// 							<Text variant='labelMedium'>
// 								{item.foundObject}, achado por {item.user}, corresponde ao seu objeto perdido{' '}
// 								{item.lostObject}
// 							</Text>
// 						</ScrollView>
// 					</View>
// 					<Divider />
// 				</CustomPressable>
// 			)}
// 		/>
// 	);
// }