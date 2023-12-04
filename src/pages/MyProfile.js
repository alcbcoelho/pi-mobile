import { View, Image } from 'react-native';
import { Text, Avatar, List } from 'react-native-paper';
import endpoints from '../config/endpoints';

// Components
import PrimaryFAB from '../components/PrimaryFAB';

// Hooks
import useUser from '../hooks/useUser';

// Styles
import { global } from '../styles/global';
import { useEffect } from 'react';

export default function MyProfile({ navigation }) {
	const { userData, getUserData } = useUser();
	const defaultUserAvatar = `${endpoints.BASE_URL}${endpoints.PUBLIC_URL}/default-avatar.jpg`;

	// useEffect(() => {});

	return (
		<View style={[global.pageContainer, { justifyContent: 'flex-start' }]}>
			<Avatar.Image
				size={192}
				style={{ marginVertical: 32 }}
				source={() => (
					<Image
						style={{ aspectRatio: 1 / 1, borderRadius: 256 }}
						source={{
							uri: userData?.avatar === 'default-avatar.jpg' ? defaultUserAvatar : userData?.avatar,
						}}
					/>
				)}
			/>
			<Text style={global.perfilUserName}>{`${userData?.firstName} ${userData?.lastName}`}</Text>
			<View style={global.button}>
				<List.Item
					style={global.objectItemSpec}
					title={userData?.email}
					left={(props) => (
						<List.Icon
							{...props}
							icon={({ size, color }) => (
								<Image
									source={require('../../assets/icons/mail-outline.png')}
									style={{ width: size, height: size, tintColor: color }}
								/>
							)}
						/>
					)}
				/>
				<List.Item
					style={global.objectItemSpec}
					title={userData?.phone}
					left={(props) => (
						<List.Icon
							{...props}
							icon={({ size, color }) => (
								<Image
									source={require('../../assets/icons/phone-outline.png')}
									style={{ width: size, height: size, tintColor: color }}
								/>
							)}
						/>
					)}
				/>
			</View>
			<View style={[global.fabButton, { gap: 16 }]}>
				<PrimaryFAB
					icon='pencil-outline'
					onPress={() =>
						navigation.navigate('EditProfile', {
							userId: userData?.id,
							unsavedChanges: false,
						})
					}
				/>
			</View>
		</View>
	);
}
