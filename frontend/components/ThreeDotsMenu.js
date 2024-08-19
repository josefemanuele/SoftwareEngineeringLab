import React, { useState } from 'react';

import { IconButton, Menu } from 'react-native-paper';

export default function ThreeDotsMenu({ children }) {
	let [ visible, setVisible ] = useState(false);

	let threeDots = <IconButton icon="dots-vertical" onPress={() => setVisible(true)} />;
	// {items.map(item => <Menu.Item title={item.title} onPress={item.action}>)}

	return (
		<>
			<Menu visible={visible} onDismiss={() => setVisible(false)} anchor={threeDots}>
				{children}
			</Menu>
		</>
	);
}
