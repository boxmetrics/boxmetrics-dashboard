<template>
	<div id="terminal"></div>
</template>
<script>
/* eslint-disable no-unused-vars */
import {
	debug,
	parseToObject,
	isArraysEqual,
	server,
	buildCommand
} from "../../utils";
import * as fit from "xterm/lib/addons/fit/fit";
import {Terminal} from "xterm";
Terminal.applyAddon(fit);
const term = new Terminal({
	cursorBlink: true,
	theme: {fontFamily: "Source Code Pro"}
});
export default {
	name: "terminal",

	data() {
		return {
			infos: {},
			currentBuffer: [],
			response: ""
		};
	},
	mounted() {
		term.open(document.getElementById("terminal"));
		term.fit();
		const shellprompt = "$ ";

		term.prompt = () => {
			term.write("\r\n" + shellprompt);
		};
		term.writeln("boxmetrics webterminal");
		term.prompt();

		term.on("key", (key, ev) => {
			const printable =
				!ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey;
			if ([8, 13, 38, 40, 39, 37].indexOf(ev.keyCode) === -1) {
				this.currentBuffer.push(key);
			}
			if (ev.keyCode === 13) {
				this.executeCommand();
			} else if (ev.keyCode === 8) {
				if (term.buffer._buffer.x > 2) {
					term.write("\b \b");
				}
			} else if (printable) {
				term.write(key);
			}
		});

		term.on("paste", (data, ev) => {
			term.write(data);
		});
	},
	methods: {
		clear() {
			term.clear();
		},
		runCommand(command, args) {
			debug("info", "object to send", {
				type: "command",
				value: command,
				options: {
					args: args.map(arg => {
						return `-${arg}`;
					})
				}
			});
			this.$socket.sendObj({
				type: "command",
				value: command,
				options: {
					args: args.map(arg => {
						return `-${arg}`;
					})
				}
			});
		},
		executeCommand() {
			term.prompt();
			if (parseToObject(this.currentBuffer).length === 0) {
				return;
			}
			this.runCommand(
				buildCommand(this.currentBuffer).command,
				buildCommand(this.currentBuffer).args
			);
			const awaitForResponse = setInterval(() => {
				if (this.response) {
					term.write(this.response);
					term.prompt();
					this.currentBuffer = [];
					this.response = "";
					clearInterval(awaitForResponse);
				}
			}, 100);
		}
	},
	beforeMount() {
		const initConnection = setInterval(() => {
			if (this.$store.getters.isConnected === true) {
				this.$socket.onmessage = msg => {
					debug("info", "data -> msg", JSON.parse(msg.data).data);
					this.response = JSON.parse(msg.data).data
						? JSON.parse(msg.data).data.replace(/(\r\n|\n)/gm, "  ")
						: "error on command execution";
				};
				clearInterval(initConnection);
			}
		}, 100);
	}
};
</script>

<style lang="scss">
#terminal {
	width: 100%;
	height: 100%;
	padding: 10px;
	background: #000000;
	border-radius: 3px;
	.xterm {
		font-family: "Source Code Pro", "Courier New", "Courier", monospace !important;
		position: relative;
		user-select: none;
		-ms-user-select: none;
		-webkit-user-select: none;
		cursor: text;

		&.focus,
		&:focus {
			outline: none;
		}
		.xterm-helpers {
			position: absolute;
			top: 0;
			z-index: 10;
		}
		.xterm-helper-textarea {
			position: absolute;
			opacity: 0;
			left: -9999em;
			top: 0;
			width: 0;
			height: 0;
			z-index: -10;
			white-space: nowrap;
			overflow: hidden;
			resize: none;
		}
		.composition-view {
			background: #000000;
			color: #fff;
			display: none;
			position: absolute;
			white-space: nowrap;
			z-index: 1;
		}
		.composition-view.active {
			display: block;
		}
		.xterm-viewport {
			background-color: #000000;
			overflow-y: scroll;
			cursor: default;
			position: absolute;
			right: 0;
			left: 0;
			top: 0;
			bottom: 0;
		}
		.xterm-screen {
			position: relative;

			canvas {
				position: absolute;
				left: 0;
				top: 0;
			}
		}
		.xterm-scroll-area {
			visibility: hidden;
		}

		.xterm-char-measure-element {
			display: inline-block;
			visibility: hidden;
			position: absolute;
			top: 0;
			left: -9999em;
			line-height: normal;
		}

		.xterm.enable-mouse-events {
			cursor: default;
		}

		.xterm.xterm-cursor-pointer {
			cursor: pointer;
		}

		.xterm.column-select.focus {
			cursor: crosshair;
		}

		.xterm .xterm-accessibility,
		.xterm .xterm-message {
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			right: 0;
			z-index: 100;
			color: transparent;
		}

		.xterm .live-region {
			position: absolute;
			left: -9999px;
			width: 1px;
			height: 1px;
			overflow: hidden;
		}

		.xterm-dim {
			opacity: 0.5;
		}

		.xterm-underline {
			text-decoration: underline;
		}
	}
}
</style>
