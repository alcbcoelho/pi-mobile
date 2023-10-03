import { View, FlatList, Image } from 'react-native';
import { Text } from 'react-native-paper';

// Data
import RegisteredObjectsData from '../mockup/RegisteredObjectsData';

// Styles
import { global } from '../styles/global';

export default function LostObjects() {
	return (
		<View>
			{/* Verificar a necessidade da View */}
			<FlatList
				data={RegisteredObjectsData.lostObjects}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View style={global.item}>
						<Image style={{ width: 50, height: 50 }} source={{ uri: item.imgUrl }} />
						<View>
							<Text style={global.prod}>Nome: {item.nome}</Text>
							<Text style={global.prod}>Descrição: {item.descrição}</Text>
						</View>
					</View>
				)}
			/>
		</View>
	);
}
