import React, { useState } from 'react';

import { TextInput } from 'react-native-paper';

export default function PasswordInput({ ...rest }) {
	let [ visible, setVisible ] = useState(false);

	if ('secureTextEntry' in rest) {
		delete rest['secureTextEntry'];
	}

	let eyeIcon = (
		<TextInput.Icon icon={visible ? 'eye-off' : 'eye'} onPress={() => setVisible(!visible)} />
	);

	return (
		<TextInput secureTextEntry={!visible} right={eyeIcon} {...rest} />
	)
}
