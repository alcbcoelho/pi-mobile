import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const global = StyleSheet.create({
	agreement: {
		flexDirection: 'row',
		width: '80%',
		marginTop: 16,
	},
	button: {
		marginVertical: 24,
	},
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'flex-start',
		backgroundColor: '#f5f5f5',
		padding: 10,
	},
	fabButton: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
	},
	helperTextUnauthenticatedPage: {
		backgroundColor: 'rgb(186, 26, 26)',
		color: '#fff',
		borderRadius: 32,
	},
	imagePlaceholder: {
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: 'rgba(0, 0, 0, .1)',
		// backgroundColor: 'rgba(148, 109, 81, 0.175)'
	},
	imageBackground: {
		aspectRatio: 4 / 3 /* 16 / 9 */,
		objectFit: 'contain',
		resizeMode: 'center',
	},
	imageRating: {
		width: '100%',
		aspectRatio: 4 / 3,
		backgroundColor: 'rgb(32, 26, 23)' /* 'grey' */,
	},
	input: {
		width: '80%',
		marginBottom: 8,
	},
	inputRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	item: {
		flex: 1,
		flexDirection: 'row',
		gap: 16,
		// backgroundColor: 'white',
		alignItems: 'center',
		padding: 16,
	},
	loginLinks: {
		width: '80%',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 16,
	},
	message: {
		textAlign: 'center',
		fontSize: 16,
	},
	notificationImage: {
		width: 64,
		height: 64,
	},
	objectInfo: {
		padding: 24,
		width: '100%',
		alignSelf: 'flex-start',
		// backgroundColor: 'blue',
	},
	objectInfoText: {
		fontSize: 16,
		marginBottom: 136,
	},
	objectItemSpec: { marginVertical: -8 },
	objectSpecs: {
		width: '100%',
	},
	objectTags: {
		width: '100%',
		padding: 16,
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
	pageContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	perfilUserName: { fontSize: 24 },
	pressableButton: {
		width: '30%',
		marginVertical: 24,
		padding: 16,
		backgroundColor: '#654',
		borderRadius: 32,
	},
	scrollviewContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	subContainer: {
		alignItems: 'flex-end',
		padding: 16,
	},
	title: {
		fontSize: 28,
		marginBottom: 32,
		marginTop: 32,
	},
});

export const styleUnauthenticatedScreens = StyleSheet.create({
	whiteText: {
		color: '#fff',
	},
	underlinedText: {
		borderStyle: 'dotted',
		borderBottomColor: '#fff',
		borderBottomWidth: 1,
		// textDecorationLine: 'underline'
	},
	input: {
		backgroundColor: '#AA866D',
	},
	logo: {
		marginBottom: 32,
		width: 278,
		height: 30,
	},
});
