export function searchInFields(words, ...fields) {
	for (let field of fields) {
		let tmp = field.toLowerCase()

		for (let word of words) {
			if (tmp.includes(word)) {
				return true;
			}
		}
	}

	return false;
}

export function filterElements(query, elements) {
	let words = query.split(' ');

	// searchInFields()
}
