import StyleSheet from 'react-native-media-query';

let { ids, styles, fullStyles } = StyleSheet.create({
	container: {
		width: '100%',
		marginLeft: 'auto',
		marginRight: 'auto',
		paddingRight: '0.75rem',
		paddingLeft: '0.75rem',

		"@media (min-width: 576px)": {
		  maxWidth: 540,
		},
		"@media (min-width: 768px)": {
		  maxWidth: 720,
		},
		"@media (min-width: 992px)": {
		  maxWidth: 960,
		},
		"@media (min-width: 1200px)": {
		  maxWidth: 1140,
		},
		"@media (min-width: 1400px)": {
		  maxWidth: 1320,
		},
	},
});

export { ids, styles, fullStyles };
