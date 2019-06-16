export const splitCamelCase = value => {
	return value
		.replace(/([a-z])([A-Z])/g, "$1 $2")
		.split(" ")
		.map(item => {
			return item.toLowerCase();
		});
};

export const parseToObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};
