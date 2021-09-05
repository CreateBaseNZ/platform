// IMPORT ===================================================

import axios from "axios";
import { getSession } from "next-auth/client";

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	// Validate PUBLIC_API_KEY
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error", content: "" });
	}
	// Check if a session exist
	const session = await getSession({ req });
	if (!session) {
		return res.send({ status: "critical error", content: "" });
	}
	// Validate if the user is an educator
	if (session.user.access !== "educator" /*|| !session.user.verified*/) {
		return res.send({ status: "critical error", content: "" });
	}
	// Create the input data
	const input = {
		name: req.body.input.name,
		license: session.user.license,
		type: req.body.input.type,
		city: req.body.input.city,
		country: req.body.input.country,
		date: req.body.input.date,
		metadata: req.body.input.metadata,
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
		data = (await axios.post(process.env.ROUTE_URL + "/organisation/create", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input }))["data"];
	} catch (error) {
		return res.send({ status: "error", content: error });
	}
	// Success handler
	return res.send(data);
}

// SECONDARY ================================================

function validate(object) {
	return new Promise(async (resolve, reject) => {
		let valid = true;
		let errors = {};
		// Validate name
		const name = validateName(object.name);
		if (!name.status) {
			valid = false;
			errors.name = name.content;
		}
		// Validate type
		const type = validateType(object.type);
		if (!type.status) {
			valid = false;
			errors.type = type.content;
		}
		// Validate city
		const city = validateCity(object.city);
		if (!city.status) {
			valid = false;
			errors.city = city.content;
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
			return reject({ status: "failed", content: errors });
		} else {
			return resolve();
		}
	});
}

// HELPER ===================================================

function validateName(name) {
	if (!name) {
		return { status: false, content: "Please enter the name of the organisation" };
	}
	return { status: true, content: "" };
}

function validateType(type) {
	if (!type) {
		return { status: false, content: "Please provide the type of the organisation" };
	}
	return { status: true, content: "" };
}

function validateCity(city) {
	if (!city) {
		return { status: false, content: "Please provide the city of the organisation" };
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
