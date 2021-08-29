import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";

import { emailPattern, passwordMinLength, usernameMinLength, usernamePattern } from "../../../utils/formValidation";

function passwordValidate(v) {
	const errors = [];
	if (!v.match(/(?=.*[a-z]){8,}/)) {
		errors.push("lowercase letter");
	}
	if (!v.match(/(?=.*[A-Z]){8,}/)) {
		errors.push("uppercase letter");
	}
	if (!v.match(/(?=.*?[0-9]){8,}/)) {
		errors.push("digit");
	}
	if (!v.match(/(?=.*?[#?!@$%^&*-]){8,}/)) {
		errors.push("special character");
	}
	if (errors.length) {
		return { status: false, content: "Requires at least one: " + errors.join(", ") };
	} else {
		return { status: true, content: "" };
	}
}

function validateEmail(email) {
	if (!email) {
		return { status: false, content: "Please enter an email." };
	} else if (!emailPattern.value.test(email)) {
		return { status: false, content: "Invalid email." };
	}
	return { status: true, content: "" };
}

function validateUsername(username) {
	if (!username) {
		return { status: false, content: "Please enter a username." };
	} else if (username.length < usernameMinLength.value) {
		return { status: false, content: "Invalid username." };
	} else if (!usernamePattern.value.test(username)) {
		return { status: false, content: "Invalid username." };
	}
	return { status: true, content: "" };
}

function validatePassword(password) {
	if (!password) {
		return { status: false, content: "Please enter a password name." };
	} else if (password.length < passwordMinLength.value) {
		return { status: false, content: "Invalid password." };
	} else if (!passwordValidate(password).status) {
		return { status: false, content: "Invalid password." };
	}
	return { status: true, content: "" };
}

function validateEmailLogin(object) {
	let valid = true;
	let errors = { email: "", password: "" };
	// Validate email
	const email = validateEmail(object.email);
	if (!email.status) {
		valid = false;
		errors.email = email.content;
	}
	// Validate password
	const password = validatePassword(object.password);
	if (!password.status) {
		valid = false;
		errors.password = password.content;
	}
	// Evaluate outcome
	if (!valid) {
		return { status: "failed", content: errors };
	} else {
		return { status: "succeeded", content: errors };
	}
}

function validateUsernameLogin(object) {
	let valid = true;
	let errors = { username: "", password: "" };
	// Validate username
	const username = validateUsername(object.username);
	if (!username.status) {
		valid = false;
		errors.username = username.content;
	}
	console.log("Username Login");
	// Validate password
	const password = validatePassword(object.password);
	if (!password.status) {
		valid = false;
		errors.password = password.content;
	}
	// Evaluate outcome
	if (!valid) {
		return { status: "failed", content: errors };
	} else {
		return { status: "succeeded", content: errors };
	}
}

async function emailLogin(object) {
	// Validate input data
	try {
		await validateEmailLogin(object);
	} catch (data) {
		return data;
	}
	// Create the input data
	const input = { email: object.email, password: object.password };
	// Send the data to the backend
	let data;
	try {
		data = (await axios.post("http://localhost/email-login", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input }))["data"];
	} catch (error) {
		if (error.response) {
			data = { status: "error", content: error.response.data };
		} else if (error.request) {
			data = { status: "error", content: error.request };
		} else {
			data = { status: "error", content: error.message };
		}
	}
	// Return data to the main function
	return data;
}

async function usernameLogin(object) {
	// Validate input data
	try {
		await validateUsernameLogin(object);
	} catch (data) {
		return data;
	}
	// Create the input data
	const input = { username: object.username, password: object.password };
	// Send the data to the backend
	let data;
	try {
		data = (await axios.post("http://localhost/username-login", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input }))["data"];
	} catch (error) {
		if (error.response) {
			data = { status: "error", content: error.response.data };
		} else if (error.request) {
			data = { status: "error", content: error.request };
		} else {
			data = { status: "error", content: error.message };
		}
	}
	// Return data to the main function
	return data;
}

export default NextAuth({
	session: {
		jwt: true,
	},
	callbacks: {
		async jwt(token, user) {
			if (user) return { user };
			return token;
		},
		async session(session, token) {
			session.user = token.user;
			return session;
		},
	},
	providers: [
		Providers.Credentials({
			async authorize(credentials) {
				// Validate PUBLIC_API_KEY
				if (credentials.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
					return res.status(403).send({ status: "critical error", content: "Invalid API Key." });
				}
				// Perform authentication based on the type
				let data;
				if (credentials.type === "email") {
					data = await emailLogin(credentials);
				} else if (credentials.type === "username") {
					data = await usernameLogin(credentials);
				}
				// Validate the authentication
				if (data.status === "failed" || data.status === "error") {
					throw new Error(data.content);
				}
				// Success handler
				return data.content;
			},
		}),
	],
});
