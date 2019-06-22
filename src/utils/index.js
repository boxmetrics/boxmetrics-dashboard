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

export const objectToCssString = obj => {
	return Object.entries(obj).reduce((styleString, [propName, propValue]) => {
		return `${styleString}${propName}:${propValue};`;
	}, "");
};

export const debug = (type, title, message) => {
	if (!message) {
		return;
	}
	const styleOptions = {
		background: "#607D8B",
		color: "#ffffff",
		padding: "5px"
	};
	switch (type) {
		case "success":
			Object.assign(styleOptions, {background: "#4CAF50"});
			break;
		case "info":
			Object.assign(styleOptions, {background: "#2196F3"});

			break;
		case "error":
			Object.assign(styleOptions, {background: "#F44336"});
			break;
		case "warning":
			Object.assign(styleOptions, {background: "#FF9800"});
			break;
		default:
	}
	// eslint-disable-next-line no-console
	console.log(`%c${title}`, objectToCssString(styleOptions), message);
};
