// IMPORT ===================================================

import axios from "axios";
import { usernameMinLength, usernamePattern } from "../../../utils/formValidation";

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	// Validate PUBLIC_API_KEY
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error", content: "Invalid API key" });
	}
	// Validate the input data
	const validity = validate(req.body.input);
	if (validity.status === "failed") {
		return res.send(validity);
	}
	// Create the input data
	const input = { username: req.body.input.username };
	// Send the data to the main backend
	let data;
	try {
		data = (await axios.post(process.env.ROUTE_URL + "/validate-username", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input }))["data"];
	} catch (error) {
		return res.send({ status: "error", content: error });
	}
	// Return outcome of the request
	return res.send(data);
}

// SECONDARY ================================================

function validate(object) {
	let valid = true;
	let errors = { username: "" };
	// Validate username
	const username = validateUsername(object.username);
	if (!username.status) {
		valid = false;
		errors.username = username.content;
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
		return { status: false, content: "Please enter a username." };
	} else if (username.length < usernameMinLength.value) {
		return { status: false, content: usernameMinLength.message };
	} else if (!usernamePattern.value.test(username)) {
		return { status: false, content: usernamePattern.message };
	}
	return { status: true, content: "" };
}
