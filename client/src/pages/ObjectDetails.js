import { View, Image } from 'react-native';
import { Text, Chip, List, FAB } from 'react-native-paper';

// Data
import MyObjectsList from '../mockup/RegisteredObjectsData';

// Styles
import { global } from '../styles/global';

export default function ObjectDetails() {
	const lostObject = MyObjectsList.lostObjects[0];

	return (
		<View style={[global.pageContainer, { justifyContent: 'flex-start' }]}>
			<View style={global.imageRating}>
				<Image
					style={global.imageBackground}
					// fadeDuration={1000}
					source={{
						uri: lostObject.imgUrl,
					}}
				/>
			</View>
			<View style={global.objectTags}>
				{lostObject.brand ? <Chip mode='outlined'>{lostObject.brand}</Chip> : null}
				{lostObject.model ? <Chip mode='outlined'>{lostObject.model}</Chip> : null}
				{lostObject.color ? <Chip mode='outlined'>{lostObject.color}</Chip> : null}
				{lostObject.characteristics.length !== 0
					? lostObject.characteristics.map((item, index) => (
							<Chip key={index} mode='outlined'>
								{item}
							</Chip>
					  ))
					: null}
			</View>
			<View style={global.objectSpecs}>
				<List.Item
					style={global.objectItemSpec}
					title={`Achado por ${lostObject.owner}`}
					left={(props) => <List.Icon {...props} icon='account-circle-outline' />}
				/>
				<List.Item
					style={global.objectItemSpec}
					title={lostObject.date}
					left={(props) => <List.Icon {...props} icon='calendar-month-outline' />}
				/>
				<List.Item
					style={global.objectItemSpec}
					title={`Por volta de ${lostObject.time}`}
					left={(props) => <List.Icon {...props} icon='clock-outline' />}
				/>
				<List.Item
					style={global.objectItemSpec}
					title={lostObject.place}
					left={(props) => <List.Icon {...props} icon='map-marker-outline' />}
				/>
			</View>
			<View style={global.objectInfo}>
				<Text style={global.objectInfoText}>{lostObject.info}</Text>
			</View>
			<View style={[global.fabButton, { gap: 16 }]}>
				<FAB icon='pencil-outline' onPress={() => console.log('Editar')} />
				<FAB icon='trash-can-outline' onPress={() => console.log('Excluir')} />
			</View>
		</View>
	);
}
