import { View, useWindowDimensions, Image, Pressable } from 'react-native';
import useAppTheme from '../hooks/useAppTheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AddImageButton({ image, onPress }) {
	const { theme, themeType } = useAppTheme();
	const { width } = useWindowDimensions();

	const imageButtonSize = (width / 2) * 0.8;
	const imageSelectorBackgroundColor = themeType === 'light' ? 'rgba(147, 75, 0, 0.15)' : 'rgba(255, 183, 130, 0.15)';

	const handleOnPress = () => {};

	return (
		<Pressable
			android_ripple={{
				color: theme.colors.surfaceVariant,
				// radius: 80,
				// borderless: true,
				foreground: image ? true : false,
			}}
			onPress={handleOnPress}
		>
			{image ? (
				<Image
					source={{ uri: image }}
					style={{
						width: imageButtonSize,
						height: imageButtonSize,
						borderRadius: 8,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				/>
			) : (
				<View
					style={{
						width: imageButtonSize,
						height: imageButtonSize,
						backgroundColor: imageSelectorBackgroundColor,
						borderRadius: 8,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<MaterialCommunityIcons name='camera-plus-outline' size={24} color={theme.colors.background} />
				</View>
			)}
		</Pressable>
	);
}
