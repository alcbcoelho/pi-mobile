import { useState } from 'react';
import { View, Image } from 'react-native';
import { Text, Avatar, List } from 'react-native-paper';
import PrimaryFAB from '../../components/PrimaryFAB';

// Styles
import { global } from '../../styles/global';

export default function MyProfile({ navigation }) {
	const [user, setUser] = useState({
		id: 1,
		name: 'Cleiton Fernandes',
		email: 'cleitin.hta@gmail.com',
		phone: '+55 61 9 9251-3746',
		avatar: 'https://img.freepik.com/psd-gratuitas/ilustracao-3d-de-avatar-ou-perfil-humano_23-2150671142.jpg',
	});

	return (
		<View style={[global.pageContainer, { justifyContent: 'flex-start' }]}>
			<Avatar.Image
				size={192}
				style={{ marginVertical: 32 }}
				source={() => <Image style={{ aspectRatio: 1 / 1, borderRadius: 256 }} source={{ uri: user.avatar }} />}
			/>
			<Text style={global.perfilUserName}>{user.name}</Text>
			<View style={global.button}>
				<List.Item
					style={global.objectItemSpec}
					title={user.email}
					left={(props) => <List.Icon
						{...props}
						icon={({ size, color }) => <Image
							source={require('../../../assets/icons/mail-outline.png')}
							style={{width: size, height: size, tintColor: color}}
						/>}
					/>}
				/>
				<List.Item
					style={global.objectItemSpec}
					title={user.phone}
					left={(props) => <List.Icon
						{...props}
						icon={({ size, color }) => <Image
							source={require('../../../assets/icons/phone-outline.png')}
							style={{width: size, height: size, tintColor: color }}
						/>}
					/>}
				/>
			</View>
			<View style={[global.fabButton, { gap: 16 }]}>
				<PrimaryFAB icon='pencil-outline' onPress={() => console.log(navigation.navigate("EditProfile"))} />
			</View>
		</View>
	);
}