import { StyleSheet } from 'react-native';

export const global = StyleSheet.create({
	pageContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	scrollviewContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	input: {
		width: '80%',
		marginBottom: 8,
	},
	inputRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	fabButton: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
	},
	button: {
		marginVertical: 24,
	},
	pressableButton: {
		width: '30%',
		marginVertical: 24,
		padding: 16,
		backgroundColor: '#654',
		borderRadius: 32,
	},
	title: {
		fontSize: 28,
		color: '#000',
		marginBottom: 16,
	},
	loginLinks: {
		width: '80%',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 8,
	},
	agreement: {
		flexDirection: 'row',
		width: '80%',
		marginTop: 16,
	},
	imageRating: {
		width: '100%',
		aspectRatio: 16 / 9,
		backgroundColor: 'grey',
	},
	imageBackground: {
		aspectRatio: 16 / 9,
		objectFit: 'contain',
		resizeMode: 'center',
	},
	objectTags: {
		width: '100%',
		padding: 16,
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
	objectSpecs: {
		width: '100%',
	},
	objectItemSpec: { marginVertical: -8 },
	objectInfo: {
		padding: 24,
		width: '100%',
		alignSelf: 'flex-start',
		// backgroundColor: 'blue',
	},
	objectInfoText: { fontSize: 16 },
	perfilUserName: { fontSize: 24 },
	message: {
		textAlign: 'center',
		fontSize: 16,
	},
	notificationImage: {
		width: 64,
		height: 64,
	},

	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'flex-start',
		backgroundColor: '#f5f5f5',
		padding: 10,
	},
	item: {
		width: '100%',
		flexDirection: 'row',
		backgroundColor: 'white',
		alignItems: 'center',
		padding: 16,
	},
	subContainer: {
		alignItems: 'flex-end',
		padding: 16,
	},
});
