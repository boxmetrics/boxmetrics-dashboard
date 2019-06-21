<template>
	<div id="terminal"></div>
</template>
<script>
import "xterm/dist/xterm.css";
import {Terminal} from "xterm";

export default {
	name: "terminal",
	mounted() {
		const term = new Terminal({
			cursorBlink: true
		});

		term.open(document.getElementById("terminal"));
		var shellprompt = "$ ";

		term.prompt = function() {
			term.write("\r\n" + shellprompt);
		};

		term.writeln("Welcome to webterminal");
		term.prompt();

		term.on("key", function(key, ev) {
			var printable =
				!ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey;

			if (ev.keyCode == 13) {
				term.prompt();
			} else if (ev.keyCode == 8) {
				if (term.x > 2) {
					term.write("\b \b");
				}
			} else if (printable) {
				term.write(key);
			}
		});

		term.on("paste", function(data, ev) {
			term.write(data);
		});
	}
};
</script>

<style lang="scss" scoped></style>
