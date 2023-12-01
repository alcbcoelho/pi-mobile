import { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { Text, Avatar, List } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../config/axiosConfig';
import endpoints from '../config/endpoints';

// Components
import PrimaryFAB from '../components/PrimaryFAB';

// Hooks
import useAuth from '../hooks/useAuth';
// import useAppTheme from '../hooks/useAppTheme';

// Styles
import { global } from '../styles/global';

export default function MyProfile({ navigation }) {
	const [userData, setUserData] = useState();
	const { userAuth } = useAuth();
	// const { themeType } = useAppTheme();
	const controller = new AbortController();
	const defaultUserAvatar = `${endpoints.BASE_URL}${endpoints.PUBLIC_URL}/default-avatar.jpg`;

	// const index = userData.findIndex((user_) => user_.email === user.email);

	useEffect(() => {
		const getUserData = async () => {
			// TODO: remover chamada da api e colocar no arquivo de services
			const res = await api.get(endpoints.USERS_URL);
			if (res?.data) {
				setUserData(res.data);
			}
		};
		getUserData();

		return () => controller.abort();
	}, []);

	return (
		<View style={[global.pageContainer, { justifyContent: 'flex-start' }]}>
			{/* {userData.avatar ? (
				<Avatar.Image
					size={192}
					style={{ marginVertical: 32 }}
					source={() => (
						<Image style={{ aspectRatio: 1 / 1, borderRadius: 256 }} source={{ uri: userData.avatar }} />
					)}
				/>
			) : (
				<Avatar.Icon
					size={192}
					icon={({ size, color }) => <Ionicons name='person' size={size} color={color} />}
					style={{
						backgroundColor: themeType === 'light' ? 'rgba(147, 75, 0, 0.15)' : 'rgba(255, 183, 130, 0.15)',
						marginVertical: 32,
					}}
				/>
			)} */}
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
						})
					}
				/>
			</View>
		</View>
	);
}
