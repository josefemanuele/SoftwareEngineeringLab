import { StyleSheet } from 'react-native';

export let GLOBAL_SPACING = 15;

export default StyleSheet.create({
	mb20: {
		marginBottom: 20
	},
	mb10: {
		marginBottom: 10
	},
	mt20: {
		marginTop: 20
	},
	spaced: {
		margin: 50
	},
	ml10: {
		marginLeft: 10
	},
	mt15p: {
		marginTop: "15%",
	},
	row: {
		flexDirection: "row",
		justifyContent: "center"
	},

	box: {
		padding: GLOBAL_SPACING,
	},
	spaceBottom: {
		marginBottom: GLOBAL_SPACING,
	},
	spaceTop: {
		marginTop: GLOBAL_SPACING,
	},
});
