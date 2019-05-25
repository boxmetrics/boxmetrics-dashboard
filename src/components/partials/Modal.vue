<template>
	<transition name="modal-fade">
		<div class="modal-backdrop">
			<div
				class="modal"
				role="dialog"
				aria-labelledby="modalTitle"
				aria-describedby="modalDescription"
			>
				<header class="modal-header" id="modalTitle">
					<slot name="header">
						Default header

						<button
							type="button"
							class="btn-close"
							@click="close"
							aria-label="Close modal"
						>
							x
						</button>
					</slot>
				</header>
				<section class="modal-body" id="modalDescription">
					<slot name="body">
						Default body
					</slot>
				</section>
				<footer class="modal-footer">
					<slot name="footer">
						Default footer

						<button
							type="button"
							class="btn"
							@click="close"
							aria-label="Close modal"
						>
							Close
						</button>
					</slot>
				</footer>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: "modal",
	methods: {
		close() {
			this.$emit("close");
		}
	}
};
</script>

<style scoped>
/* basic style */
.modal-backdrop {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1072;
}

.modal {
	width: 100%;
	max-width: 568px;
	flex: 0 1 auto;
	max-height: calc(100% - 96px);
	background: #ffffff;
	box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.16),
		0px 24px 38px 3px rgba(0, 0, 0, 0.14),
		0px 9px 46px 8px rgba(0, 0, 0, 0.12);
	overflow-x: auto;
	display: flex;
	border-radius: 3px;
	flex-direction: column;
}

.modal-header,
.modal-footer {
	padding: 25px;
	display: flex;
}

.modal-header {
	color: #2874ed;
	justify-content: space-between;
	font-size: 22px;
}

.modal-footer {
	justify-content: flex-end;
}

.modal-body {
	position: relative;
	padding: 0 10px;
}

.btn-close {
	border: none;
	font-size: 20px;
	padding: 20px;
	cursor: pointer;
	font-weight: bold;
	color: #2874ed;
	background: transparent;
}

.btn {
	color: #ffffff;
	background: #2874ed;
	border: 1px solid #2874ed;
	border-radius: 2px;
}
</style>
