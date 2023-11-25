import { View, FlatList, Image, ScrollView } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import CustomPressable from './CustomPressable';

// Data
import { unreadNotifications, allNotifications as allNotifications_ } from '../mockup/NotificationsData';

// Styles
import { global } from '../styles/global';

export default function NotificationList({ navigation, allNotifications = false }) {
	return (
		<FlatList
			data={allNotifications ? allNotifications_ : unreadNotifications}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<CustomPressable
					onPress={() =>
						navigation.navigate('ObjectScreenRoutes', {
							screen: 'ObjectDetails',
						})
					}
				>
					<View style={global.item}>
						<Image style={{ width: 50, height: 50, borderRadius: 2.5 }} source={{ uri: item.imgUrl }} />
						<ScrollView>
							<Text variant='titleMedium'>{item.title}</Text>
							<Text variant='labelMedium'>
								{item.foundObject}, achado por {item.user}, corresponde ao seu objeto perdido{' '}
								{item.lostObject}
							</Text>
						</ScrollView>
					</View>
					<Divider />
				</CustomPressable>
			)}
		/>
	);
}
