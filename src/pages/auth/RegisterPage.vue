<template>
	<Form @submit="register">
		<template #header>
			<router-link :to="'/'"
				><img
					src="@/assets/images/boxmetrics-full.png"
					width="280"
					alt=""
				/>
			</router-link>
		</template>
		<template #body>
			<div class="field">
				<input
					class="input"
					:class="{'has-error': errors.username}"
					required
					v-model="username"
					type="text"
					placeholder="Username"
					@keydown="errors.username = ''"
				/>
				<p class="help error">{{ errors.username }}</p>
			</div>
			<div class="field">
				<input
					class="input"
					:class="{'has-error': errors.email}"
					required
					v-model="email"
					type="email"
					placeholder="Email"
					@keydown="errors.email = ''"
				/>
				<p class="help error">{{ errors.email }}</p>
			</div>
			<div class="field">
				<input
					class="input"
					:class="{'has-error': errors.password}"
					required
					v-model="password"
					type="password"
					placeholder="Password"
					@keydown="errors.password = ''"
				/>
				<p class="help error">{{ errors.password }}</p>
			</div>
			<button
				type="submit"
				class="btn submit"
				:disabled="isLoading || errors.length > 0"
			>
				<span v-if="!isLoading">Register</span>
				<Loader v-else></Loader>
			</button>
		</template>
		<template #footer>
			<router-link class="login-password" :to="'/auth/forgot_password'">
				Log in
			</router-link>
		</template>
	</Form>
</template>

<script>
import {debug, isEmailValid, isFieldValid} from "../../utils";
import Form from "@/components/partials/Form";
import Loader from "@/components/ui/loader";

export default {
	name: "RegisterPage",
	data() {
		return {
			errors: {},
			email: "",
			username: "",
			password: ""
		};
	},
	components: {
		Form,
		Loader
	},
	computed: {
		isLoading() {
			return this.$store.getters.authStatus === "loading";
		}
	},
	methods: {
		register() {
			this.errors = {};
			const {email, password, username} = this;
			if (!isEmailValid(email)) {
				debug(
					"warning",
					"register -> isEmailValid - email not valid",
					!isEmailValid(email)
				);
				this.errors.email = "This field is required and must be valid";
			}
			if (!isFieldValid(password)) {
				debug(
					"warning",
					"register -> isFieldValid - password not valid",
					!isFieldValid(password)
				);
				this.errors.password =
					"This field is required and must be valid";
			}
			if (!isFieldValid(username)) {
				debug(
					"warning",
					"register -> isFieldValid - username not valid",
					!isFieldValid(username)
				);
				this.errors.username =
					"This field is required and must be valid";
			}
			if (
				Object.keys(JSON.parse(JSON.stringify(this.errors))).length ===
				0
			) {
				this.$store
					.dispatch("register", {username, email, password})
					.then(() => {
						window.location.href = "/";
					});
			}
		}
	}
};
</script>
