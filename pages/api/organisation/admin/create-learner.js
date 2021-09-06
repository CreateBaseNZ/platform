// IMPORT ===================================================

import axios from "axios";
import { getSession } from "next-auth/client";
import { displayNameMinLength, displayNamePattern, emailPattern, passwordMinLength, usernameMinLength, usernamePattern } from "../../../../utils/formValidation";

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	// Validate PUBLIC_API_KEY
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error", content: "" });
	}
	// Perform access validation
	const session = await getSession({ req });
	if (!session) {
		// Validate a user is logged in
		return res.send({ status: "critical error", content: "" });
	} else if (!session.user.organisation) {
		// Validate the user is in an organisation
		return res.send({ status: "critical error", content: "" });
	} else if (session.user.access !== "admin" /*|| !session.user.verified*/) {
		// Validate if the user is an admin
		return res.send({ status: "critical error", content: "" });
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
	// Validate the input data
	const validity = validate(input);
	if (validity.status === "failed") {
		return res.send(validity);
	}
	// Send the data to the main backend
	let data;
	try {
		data = (await axios.post(process.env.ROUTE_URL + "/organisation/admin/create-learner", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input }))["data"];
	} catch (error) {
		return res.send({ status: "error", content: error });
	}
	// Success handler
	return res.send(data);
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
