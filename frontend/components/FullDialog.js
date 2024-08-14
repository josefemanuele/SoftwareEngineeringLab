import React from 'react';

import { Button, Dialog, Portal, Text } from 'react-native-paper';

export default function FullDialog({ visible, title, content, actions, onDismiss }) {
	let buttons = actions.map((action, index) => (
		<Button key={index} icon={action.icon} mode="contained" onPress={action.callback}>
			{action.name}
		</Button>
	));

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={onDismiss} style={{
				alignSelf: 'center',
				maxWidth: 500,
			}}>
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
