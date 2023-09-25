import { StyleSheet } from 'react-native';

export const global = StyleSheet.create({
	pageContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	contentContainer: {
		flex: 1,
		width: '90%',
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

	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'flex-start',
		backgroundColor: '#f5f5f5',
		padding: 10,
	},
	button: {
		fontSize: 15,
	},
	item: {
		flexDirection: 'row',
		backgroundColor: 'white',
		padding: 15,
		marginVertical: 1,
	},
	subContainer: {
		alignItems: 'flex-end',
		padding: 16,
	},
});
