import { View, FlatList, Image, Pressable } from 'react-native';
import { Text } from 'react-native-paper';

// Data
import RegisteredObjectsData from '../mockup/RegisteredObjectsData';

// Styles
import { global } from '../styles/global';

export default function LostObjects({ navigation }) {
	return (
		<View>
			{/* Verificar a necessidade da View */}
			<FlatList
				data={RegisteredObjectsData.lostObjects}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<Pressable onPress={() => navigation.navigate('ObjectDetails')}>
						<View style={global.item}>
							<Image style={{ width: 50, height: 50 }} source={{ uri: item.imgUrl[0] }} />
							<View>
								<Text style={global.prod}>{item.object}</Text>
								<Text style={global.prod}>Perdido em {item.date}, por volta das {item.time}, em {item.place}</Text>
							</View>
						</View>
					</Pressable>
				)}
			/>
		</View>
	);
}
