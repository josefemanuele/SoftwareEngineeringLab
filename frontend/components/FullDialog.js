import React from 'react';

import { Text } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';

export default function FullDialog({ visible, title, content, actions, onDismiss }) {
	let buttons = actions.map((action, index) => (
		<Button key={index} icon={action.icon} mode="contained" onPress={action.callback}>
			{action.name}
		</Button>
	));

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={onDismiss}>
				<Dialog.Title>{title}</Dialog.Title>
				<Dialog.Content>
					<Text>{content}</Text>
				</Dialog.Content>
				<Dialog.Actions>
					{buttons}
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}
