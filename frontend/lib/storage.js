import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// let backend = AsyncStorage;
let backend = window.localStorage;

export let storage = new Storage({
	size: 1024,
	storageBackend: backend,
	defaultExpires: null,
	enableCache: true,
	sync: {
	},
});

export async function load(key) {
	let result;
	try {
		result = await storage.load({
			key: key,
			autoSync: false,
		});
	} catch (e) {
		result = null;
	}

	return result;
}

export async function save(key, value) {
	return await storage.save({
		key: key,
		data: value,
		expires: null,
	});
}

export async function remove(key) {
	return await storage.remove({
		key: key,
	});
}
