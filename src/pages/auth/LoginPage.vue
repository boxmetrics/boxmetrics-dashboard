<template>
	<Form @submit="login">
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
					:class="{'has-error': errors.email}"
					required
					v-model="email"
					type="email"
					placeholder="Email"
					autocomplete="email"
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
					autocomplete="current-password"
					placeholder="Password"
					@keydown="errors.password = ''"
				/>
				<p class="help error">{{ errors.password }}</p>
			</div>
			<button type="submit" class="btn submit" :disabled="isLoading">
				<span v-if="!isLoading">Log in</span>
				<Loader v-else></Loader>
			</button>
		</template>
		<template #footer>
			<router-link class="register-link" :to="'/auth/register'">
				Register
			</router-link>
			<router-link class="forgot-password" :to="'/auth/forgot_password'">
				Forgot password
			</router-link>
		</template>
	</Form>
</template>

<script>
import {debug, isEmailValid, isFieldValid} from "../../utils";
import Form from "@/components/partials/Form";
import Loader from "@/components/ui/loader";

export default {
	name: "LoginPage",
	data() {
		return {
			errors: {},
			email: "",
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
		login() {
			this.errors = {};
			const {email, password} = this;
			if (!isEmailValid(email)) {
				debug(
					"warning",
					"login -> isEmailValid - email not valid",
					!isEmailValid(email)
				);
				this.errors.email = "This field is required and must be valid";
			}
			if (!isFieldValid(password)) {
				debug(
					"warning",
					"login -> isFieldValid - password not valid",
					!isFieldValid(password)
				);
				this.errors.password =
					"This field is required and must be valid";
			}

			if (
				Object.keys(JSON.parse(JSON.stringify(this.errors))).length ===
				0
			) {
				this.$store.dispatch("login", {email, password}).then(() => {
					window.location.href = "/";
				});
			}
		}
	}
};
</script>
