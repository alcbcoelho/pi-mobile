import { Image, View, useWindowDimensions } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';

// Styles
import { global } from '../styles/global';

// Data
import MyObjectsList from '../mockup/RegisteredObjectsData';

export default function SwipeableImage({ renderRightActions }) {
	const { width } = useWindowDimensions();

	return (
		<Carousel
			data={MyObjectsList.lostObjects[0].imgUrl}
			renderItem={({ item, index }) => (
				<View style={{ flex: 1 }} key={index}>
					<Image style={{ height: width, padding: 16 }} source={{ uri: item }} />
				</View>
			)}
			itemWidth={width}
			sliderWidth={width}
		/>
		// <>
		//   {renderRightActions ? (
		//     <Swipeable renderRightActions={renderRightActions}>
		//       <View style={global.imageRating}>
		//         <Image
		//           style={global.imageBackground}
		//           source={{ uri: MyObjectsList.lostObjects[0].imgUrl[0] }}
		//         />
		//       </View>
		//     </Swipeable>
		//   ) : (
		//     <View style={global.imageRating}>
		//       <Image
		//         style={global.imageBackground}
		//         source={{ uri: MyObjectsList.lostObjects[0].imgUrl[0] }}
		//       />
		//     </View>
		//   )}
		// </>
	);
}
