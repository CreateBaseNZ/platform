import axios from "axios";
import { getSession } from "next-auth/client";

function validateName(name) {
	if (!name) {
		return { status: false, content: "Please enter the name of the organisation" };
	}
	return { status: true, content: "" };
}

function validateCode(code) {
	if (!code) {
		return { status: false, content: "Please enter the code for educators" };
	}
	return { status: true, content: "" };
}

function validateType(type) {
	if (!type) {
		return { status: false, content: "Please provide the type of the organisation" };
	}
	return { status: true, content: "" };
}

function validateCountry(country) {
	if (!country) {
		return { status: false, content: "Please provide the country of the organisation" };
	}
	return { status: true, content: "" };
}

function validateDate(date) {
	if (!date) {
		return { status: false, content: "Please provide a date" };
	}
	return { status: true, content: "" };
}

function validateMetadata(metadata, type, country) {
	if (type === "school" && country === "New Zealand") {
		if (!metadata) {
			return { status: false, content: "Please provide a metadata" };
		} else if (!metadata.id) {
			return { status: false, content: "Please enter your school ID" };
		}
	}
	return { status: true, content: "" };
}

function validate(object) {
	let valid = true;
	let errors = { name: "", code: "", type: "", country: "", date: "", metadata: "" };
	// Validate name
	const name = validateName(object.name);
	if (!name.status) {
		valid = false;
		errors.name = name.content;
	}
	// Validate code
	const code = validateCode(object.code);
	if (!code.status) {
		valid = false;
		errors.code = code.content;
	}
	// Validate type
	const type = validateType(object.type);
	if (!type.status) {
		valid = false;
		errors.type = type.content;
	}
	// Validate country
	const country = validateCountry(object.country);
	if (!country.status) {
		valid = false;
		errors.country = country.content;
	}
	// Validate date
	const date = validateDate(object.date);
	if (!date.status) {
		valid = false;
		errors.date = date.content;
	}
	// Validate metadata
	const metadata = validateMetadata(object.metadata);
	if (!metadata.status) {
		valid = false;
		errors.metadata = metadata.content;
	}
	// Evaluate outcome
	if (!valid) {
		return { status: "failed", content: errors };
	} else {
		return { status: "succeeded", content: errors };
	}
}

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
	// Validate if the user is an educator
	if (session.user.access !== "educator" /*|| !session.user.verified*/) {
		return res.status(400).send({ status: "critical error", content: "Invalid access" });
	}
	// Validate if the user is already part of an organisation
	if (session.user.organisation) {
		return res.status(400).send({ status: "critical error", content: "The user is already in an organisation" });
	}
	// Validate the input data
	const validity = validate(req.body.input);
	if (validity.status === "failed") {
		return res.status(400).send(validity);
	}
	// Create the input data
	const input = {
		name: req.body.input.name,
		code: req.body.input.code,
		license: session.user.license,
		type: req.body.input.type,
		country: req.body.input.country,
		date: req.body.input.date,
		metadata: req.body.input.metadata,
	};
	// Send the data to the main backend
	let data;
	try {
		data = (await axios.post("https://createbase.co.nz/organisation/educator-join", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input }))["data"];
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
