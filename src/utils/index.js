import {env} from "../config";

export const debug = (type, title, message) => {
	if (!message || env !== "development") {
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

export const splitCamelCase = value => {
	return value
		.replace(/([a-z])([A-Z])/g, "$1 $2")
		.split(" ")
		.map(item => {
			return item.toLowerCase();
		});
};

export const isFieldValid = value => {
	if (!value.length) {
		return false;
	}
	return true;
};

export const isPasswordValid = value => {
	if (!value.length) {
		return false;
	}
	return true;
};

export const isEmailValid = email => {
	if (
		!email.length ||
		!email.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
		)
	) {
		return false;
	}
	return true;
};

export const parseToObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

export const objectToCssString = obj => {
	return Object.entries(obj).reduce((styleString, [propName, propValue]) => {
		return `${styleString}${propName}:${propValue};`;
	}, "");
};

export const isArraysEqual = (obj1, obj2) => {
	return (
		obj1.length == obj2.length &&
		obj1.every((element, index) => {
			return element === obj2[index];
		})
	);
};

// TODO: implement methods
// to get infos directly
export const serverGetters = {
	getGeneralInfos() {
		return {type: "info", value: "general"};
	},
	getMemory() {
		return {type: "info", value: "memory"};
	},
	getCpu() {
		return {type: "info", value: "cpu"};
	},
	getCpuInfo() {
		return {type: "info", value: "cpuInfo"};
	},
	getDisks() {
		return {type: "info", value: "disks"};
	},
	getHost() {
		return {type: "info", value: "host"};
	},
	getUsers() {
		return {type: "info", value: "users"};
	},
	getNetwork() {
		return {type: "info", value: "network"};
	},
	getConnections() {
		return {type: "info", value: "connections"};
	},
	getProcesses() {
		return {type: "info", value: "processes"};
	},
	getProcess(pid) {
		return {type: "info", value: {options: {pid}}};
	},
	addUser(user, password) {
		return {
			type: "script",
			value: "adduser",
			options: {
				args: [`-u ${user}`, `-p ${password}`]
			}
		};
	},
	killProcess(pid) {
		return {
			type: "script",
			value: "killprocess",
			options: {
				pid: Number(pid)
			}
		};
	},
	runCommand(command, args) {
		return {type: "command", value: command, options: {args}};
	}
};

export const buildCommand = obj => {
	const splittedObj = obj.join("").split("-");
	const command = splittedObj[0].trim();
	const args = splittedObj.length > 1 ? splittedObj.slice(1) : [];

	return {
		command,
		args
	};
};

export const omit = (obj, arr) => {
	return Object.keys(obj)
		.filter(k => {
			return !arr.includes(k);
		})
		.reduce((acc, key) => {
			return (acc[key] = obj[key]), acc;
		}, {});
};
