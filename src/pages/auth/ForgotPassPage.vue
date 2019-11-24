<template>
	<Form @submit="reset">
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
			<button type="submit" class="btn submit" :disabled="isLoading">
				<span v-if="!isLoading">Reset password</span>
				<Loader v-else></Loader>
			</button>
		</template>
		<template #footer>
			<router-link class="go-back-link" :to="'/auth/login'">
				Back to login
			</router-link>
		</template>
	</Form>
</template>

<script>
import {debug, isFieldValid, isEmailValid} from "../../utils";
import Form from "@/components/partials/Form";
import Loader from "@/components/ui/loader";

export default {
	name: "ForgotPassPage",
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
		reset() {
			this.errors = {};
			const {email, password} = this;
			if (!isEmailValid(email)) {
				debug(
					"warning",
					"reset -> isEmailValid - email not valid",
					!isEmailValid(email)
				);
				this.errors.email = "This field is required and must be valid";
			}
			if (!isFieldValid(password)) {
				debug(
					"warning",
					"reset -> isPasswordValid - password not valid",
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
					this.$router.push("/dashboard");
				});
			}
		}
	}
};
</script>
