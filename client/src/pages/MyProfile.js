import { useState } from 'react';
import { View, Image } from 'react-native';
import { Text, Avatar, List, FAB } from 'react-native-paper';

// Styles
import { global } from '../../styles/global';

export default function MyProfile() {
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
				style={{ marginVertical: 40 }}
				source={() => <Image style={{ aspectRatio: 1 / 1, borderRadius: 256 }} source={{ uri: user.avatar }} />}
			/>
			<Text style={global.perfilUserName}>{user.name}</Text>
			<View style={global.button}>
				<List.Item
					style={global.objectItemSpec}
					title={user.email}
					left={(props) => <List.Icon {...props} icon='email-outline' />}
				/>
				<List.Item
					style={global.objectItemSpec}
					title={user.phone}
					left={(props) => <List.Icon {...props} icon='phone-outline' />}
				/>
			</View>
			<View style={[global.fabButton, { gap: 16 }]}>
				<FAB icon='pencil-outline' onPress={() => console.log('Editar')} />
			</View>
		</View>
	);
}