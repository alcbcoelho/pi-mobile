import { View, Image, ScrollView, FlatList } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Text, Chip, List, FAB, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import PrimaryFAB from '../../components/PrimaryFAB';
import { useWindowDimensions } from 'react-native';

// Data
import MyObjectsList from '../../mockup/RegisteredObjectsData';

// Styles
import { global } from '../../styles/global';
import { resizeMode } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';

export default function ObjectDetails() {
	const lostObject = MyObjectsList.lostObjects[0];
	const theme = useTheme();
	const { width } = useWindowDimensions();

	return (
	<>
		<ScrollView>
			<View style={[global.pageContainer, { justifyContent: "flex-start", height: '100%' }]}>
				{/* <ImageCarousel data={lostObject.imgUrl} /> */}
				{/* <Image source={{ uri: MyObjectsList.lostObjects[0].imgUrl[0] }} /> */}
				<FlatList
					data={MyObjectsList.lostObjects[0].imgUrl}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					alwaysBounceHorizontal={false}
					bounces={false}
					directionalLockEnabled={true}
					pagingEnabled={true}
					// ListEmptyComponent={}	// configurar isso aqui depois
					renderItem={({ item, index }) => (
						<View key={index} style={{ width, height: width}}>
							<Image style={{width, height: '100%'}} source={{ uri: item }}/>
						</View>
					)}
				/>
				<View style={global.objectTags}>
					{lostObject.brand ? (
					<Chip mode="outlined">{lostObject.brand}</Chip>
					) : null}
					{lostObject.model ? (
					<Chip mode="outlined">{lostObject.model}</Chip>
					) : null}
					{lostObject.color ? (
					<Chip mode="outlined">{lostObject.color}</Chip>
					) : null}
					{lostObject.characteristics.length !== 0
					? lostObject.characteristics.map((item, index) => (
						<Chip key={index} mode="outlined">
							{item}
						</Chip>
						))
					: null}
				</View>
				<View style={global.objectSpecs}>
					<List.Item
					style={global.objectItemSpec}
					title={`Achado por ${lostObject.owner}`}
					left={(props) => (
						<List.Icon
						{...props} /* icon='account-circle-outline' */
						icon={({ size }) => (
							<Image
							source={{
								uri: "https://img.freepik.com/psd-gratuitas/ilustracao-3d-de-avatar-ou-perfil-humano_23-2150671142.jpg",
							}}
							style={{
								width: size,
								height: size,
								aspectRatio: 1 / 1,
								borderRadius: 256,
							}}
							/>
						)}
						/>
					)}
					/>
					<List.Item
					style={global.objectItemSpec}
					title={lostObject.date}
					left={(props) => (
						<List.Icon
						{...props}
						/* icon='calendar-month-outline' */ icon={({ size, color }) => (
							<Ionicons name="calendar-outline" size={size} color={color} />
						)}
						/>
					)}
					/>
					<List.Item
					style={global.objectItemSpec}
					title={`Por volta de ${lostObject.time}`}
					left={(props) => (
						<List.Icon
						{...props}
						/* icon='clock-outline' */ icon={({ size, color }) => (
							<Ionicons name="time-outline" size={size} color={color} />
						)}
						/>
					)}
					/>
					<List.Item
					style={global.objectItemSpec}
					title={lostObject.place}
					left={(props) => (
						<List.Icon
						{...props}
						/* icon='map-marker-outline' */ icon={({ size, color }) => (
							<Ionicons name="location-outline" size={size} color={color} />
						)}
						/>
					)}
					/>
				</View>
				<View style={global.objectInfo}>
					<Text style={global.objectInfoText}>{lostObject.info}</Text>
				</View>
			</View>
		</ScrollView>
		<View style={[global.fabButton, { gap: 16 }]}>
			<PrimaryFAB
			icon="pencil-outline"
			onPress={() => console.log("Editar")}
			/>
			<FAB
			icon="trash-can-outline"
			color={"white"/* theme.colors.onError */}
			style={{ backgroundColor: "rgb(186, 26, 26)"/* theme.colors.error */ }}
			onPress={() => console.log("Excluir")}
			/>
		</View>
	</>
  );
}