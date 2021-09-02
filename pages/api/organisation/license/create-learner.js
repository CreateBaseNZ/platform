// IMPORT ===================================================

import axios from "axios";
import { getSession } from "next-auth/client";
import { displayNameMinLength, displayNamePattern, emailPattern, passwordMinLength, usernameMinLength, usernamePattern } from "../../../../utils/formValidation";

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	// Validate PUBLIC_API_KEY
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.status(403).send({ status: "critical error", content: "Invalid API Key" });
	}
	// Check if a session exist
	const session = await getSession({ req });
	if (!session) {
		return res.status(400).send({ status: "critical error", content: "Please log in" });
	}
	// Check if there is an organisation
	if (!session.user.organisation) {
		return res.status(400).send({ status: "critical error", content: "There is no organisation" });
	}
	// Validate if the user is an admin
	if (session.user.access !== "admin" /*|| !session.user.verified*/) {
		return res.status(400).send({ status: "critical error", content: "Invalid access" });
	}
	// Validate the input data
	const validity = validate(req.body.input);
	if (validity.status === "failed") {
		return res.status(400).send(validity);
	}
	// Create the input data
	let input = {
		organisation: session.user.organisation,
		username: req.body.input.username,
		password: req.body.input.password,
		status: req.body.input.status,
		date: req.body.input.date,
		displayName: req.body.input.displayName,
	};
	if (req.body.input.saves) input.saves = req.body.input.saves;
	// Send the data to the main backend
	let data;
	try {
		data = (await axios.post("https://createbase.co.nz/organisation/admin-create-learner", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input }))["data"];
	} catch (error) {
		if (error.response) {
			return res.status(error.response.status).send({ status: "error", content: error.response.data });
		} else if (error.request) {
			return res.status(504).send({ status: "error", content: error.request });
		} else {
			return res.status(500).send({ status: "error", content: error.message });
		}
	}
	// Validate response
	if (data.content === "Invalid Private API Key") {
		return res.status(403).send(data);
	}
	// Success handler
	return res.status(200).send(data);
}

// SECONDARY ================================================

function validate(object) {
	let valid = true;
	let errors = {};
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
	// Validate status
	const status = validateStatus(object.status);
	if (!status.status) {
		valid = false;
		errors.status = status.content;
	}
	// Validate date
	const date = validateDate(object.date);
	if (!date.status) {
		valid = false;
		errors.date = date.content;
	}
	// Validate displayName
	const displayName = validateDisplayName(object.displayName);
	if (!displayName.status) {
		valid = false;
		errors.displayName = displayName.content;
	}
	// Evaluate outcome
	if (!valid) {
		return { status: "failed", content: errors };
	} else {
		return { status: "succeeded", content: errors };
	}
}

// HELPER ===================================================

function validateUsername(username) {
	if (!username) {
		return { status: false, content: "Please enter a username" };
	} else if (username.length < usernameMinLength.value) {
		return { status: false, content: usernameMinLength.message };
	} else if (!usernamePattern.value.test(username)) {
		return { status: false, content: usernamePattern.message };
	}
	return { status: true, content: "" };
}

function validatePassword(password) {
	if (!password) {
		return { status: false, content: "Please enter a password name" };
	} else if (password.length < passwordMinLength.value) {
		return { status: false, content: passwordMinLength.message };
	} else if (!passwordValidate(password).status) {
		return { status: false, content: passwordValidate(password).content };
	}
	return { status: true, content: "" };
}

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

function validateStatus(status) {
	if (!status) {
		return { status: false, content: "Please provide a status" };
	}
	return { status: true, content: "" };
}

function validateDate(date) {
	if (!date) {
		return { status: false, content: "Please provide a date" };
	}
	return { status: true, content: "" };
}

function validateDisplayName(displayName) {
	if (!displayName) {
		return { status: false, content: "Please enter a display name" };
	} else if (displayName.length < displayNameMinLength.value) {
		return { status: false, content: displayNameMinLength.message };
	} else if (!displayNamePattern.value.test(displayName)) {
		return { status: false, content: displayNamePattern.message };
	}
	return { status: true, content: "" };
}
