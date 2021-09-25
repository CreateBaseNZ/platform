// IMPORT ===================================================

import axios from "axios";
import { displayNameMinLength, displayNamePattern, emailPattern, passwordMinLength, usernameMinLength, usernamePattern } from "../../../utils/formValidation";

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	// Validate PUBLIC_API_KEY
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error", content: "" });
	}
	// Create the input data
	const input = {
		email: req.body.input.email,
		username: req.body.input.username,
		displayName: req.body.input.displayName,
		password: req.body.input.password,
		date: req.body.input.date,
	};
	// Validate the input data
	try {
		await validate(input);
	} catch (data) {
		return res.send(data);
	}
	// Send the data to the main backend
	let data;
	try {
		data = (await axios.post(process.env.ROUTE_URL + "/signup/educator", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input }))["data"];
	} catch (error) {
		return res.send({ status: "error", content: error });
	}
	// Return outcome of the request
	return res.send(data);
}

// SECONDARY ================================================

function validate(object) {
	return new Promise((resolve, reject) => {
		let valid = true;
		let errors = {};
		// Validate email
		const email = validateEmail(object.email);
		if (!email.status) {
			valid = false;
			errors.email = email.content;
		}
		// Validate username
		const username = validateUsername(object.username);
		if (!username.status) {
			valid = false;
			errors.username = username.content;
		}
		// Validate display name
		const displayName = validateDisplayName(object.displayName);
		if (!displayName.status) {
			valid = false;
			errors.displayName = displayName.content;
		}
		// Validate password
		const password = validatePassword(object.password);
		if (!password.status) {
			valid = false;
			errors.password = password.content;
		}
		// Validate date
		const date = validateDate(object.date);
		if (!date.status) {
			valid = false;
			errors.date = date.content;
		}
		// Evaluate outcome
		if (!valid) {
			return reject({ status: "failed", content: errors });
		} else {
			return resolve();
		}
	});
}

// HELPER ===================================================

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
		return { status: false, content: emailPattern.message };
	}
	return { status: true, content: "" };
}

function validateUsername(username) {
	if (!username) {
		return { status: false, content: "Please enter a username." };
	} else if (username.length < usernameMinLength.value) {
		return { status: false, content: usernameMinLength.message };
	} else if (!usernamePattern.value.test(username)) {
		return { status: false, content: usernamePattern.message };
	}
	return { status: true, content: "" };
}

function validateDisplayName(displayName) {
	if (!displayName) {
		return { status: false, content: "Please enter a display name." };
	} else if (displayName.length < displayNameMinLength.value) {
		return { status: false, content: displayNameMinLength.message };
	} else if (!displayNamePattern.value.test(displayName)) {
		return { status: false, content: displayNamePattern.message };
	}
	return { status: true, content: "" };
}

function validatePassword(password) {
	if (!password) {
		return { status: false, content: "Please enter a password name." };
	} else if (password.length < passwordMinLength.value) {
		return { status: false, content: passwordMinLength.message };
	} else if (!passwordValidate(password).status) {
		return { status: false, content: passwordValidate(password).content };
	}
	return { status: true, content: "" };
}

function validateDate(date) {
	if (!date) {
		return { status: false, content: "Please enter a date name." };
	}
	return { status: true, content: "" };
}
