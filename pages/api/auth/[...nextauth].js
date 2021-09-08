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
		return {
			status: false,
			content: "Requires at least one: " + errors.join(", "),
		};
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
	return new Promise((resolve, reject) => {
		let valid = true;
		let errors = new Object();
		// Validate username
		const username = validateUsername(object.username);
		if (!username.status) {
			valid = false;
			errors.username = username.content;
		}
		// Validate password
		const password = validatePassword(object.password);
		if (!password.status) {
			valid = false;
			errors.password = password.content;
		}
		// Evaluate outcome
		if (!valid) {
			return reject({ status: "failed", content: errors });
		} else {
			return resolve();
		}
	});
}

async function emailLogin(object) {
	// Validate input data
	try {
		await validateEmailLogin(object);
	} catch (data) {
		return data;
	}
	// Create the input data
	const input = { email: object.user, password: object.password };
	// Send the data to the backend
	let data;
	try {
		data = (
			await axios.post(process.env.ROUTE_URL + "/email-login", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input,
			})
		)["data"];
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
	const input = { username: object.user, password: object.password };
	// Send the data to the backend
	let data;
	try {
		data = (await axios.post(process.env.ROUTE_URL + "/username-login", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input }))["data"];
	} catch (error) {
		data = { status: "error", content: error };
	}
	// Return data to the main function
	return data;
}

async function updateSession(license, profile) {
	return new Promise(async (resolve, reject) => {
		let data;
		try {
			data = (
				await axios.post(process.env.ROUTE_URL + "/update-session", {
					PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
					input: { license, profile },
				})
			)["data"];
		} catch (error) {
			if (error.response) {
				data = { status: "error", content: error.response.data };
			} else if (error.request) {
				data = { status: "error", content: error.request };
			} else {
				data = { status: "error", content: error.message };
			}
		}
		if (data.status === "failed" || data.status === "error") return reject(data);
		return resolve(data.content);
	});
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
			if (!token) return session;
			session.user = token.user;
			let userSession;
			try {
				userSession = await updateSession(session.user.license, session.user.profile);
			} catch (data) {
				return session;
			}
			session.user = userSession;
			return session;
		},
		async redirect(url) {
			return url;
		},
	},
	providers: [
		Providers.Credentials({
			async authorize(credentials) {
				// Validate PUBLIC_API_KEY
				if (credentials.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
					throw new Error(JSON.stringify({ status: "critical error", content: "" }));
				}
				// Check if the input is an email
				const type = emailPattern.value.test(credentials.user) ? "email" : "username";
				// Perform authentication based on the type
				let data;
				if (type === "email") {
					data = await emailLogin(credentials);
				} else if (type === "username") {
					data = await usernameLogin(credentials);
				}
				// Validate the authentication
				if (data.status === "critical error" || data.status === "error" || data.status === "failed") {
					throw new Error(JSON.stringify(data));
				}
				// Success handler
				return data.content;
			},
		}),
	],
});
