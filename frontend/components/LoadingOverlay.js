import React from 'react';

import { View } from 'react-native';
import { ActivityIndicator, Modal, Portal } from 'react-native-paper';

export default function LoadingOverlay({ visible }) {
	return (
		<Portal>
			<Modal visible={visible} dismissable={false}>
				<ActivityIndicator size="large" />
			</Modal>
		</Portal>
	)
}
