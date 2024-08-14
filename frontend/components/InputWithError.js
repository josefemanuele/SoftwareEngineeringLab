import React from 'react';

import { HelperText } from 'react-native-paper';

export default function InputWithError({ Component, errorMessage, ...rest }) {
	return (
		<>
			<Component {...rest} />

			<HelperText type="error" visible={rest.error}>
				{errorMessage || ' '}
			</HelperText>
		</>
	)
}
