// IMPORT ===================================================

import axios from "axios";

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	// Validate PUBLIC_API_KEY
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error", content: "" });
	}
	const input = req.body.input;
	// Create the input data
	let input = { query: { _id: input.profileId }, option: {} };
	// Send the data to the main backend
	let data;
	try {
		data = (await axios.post(process.env.ROUTE_URL + "/profile/retrieve", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input }))["data"];
	} catch (error) {
		return res.send({ status: "error", content: error });
	}
	// Build the properties
	let object = {};
	for (let i = 0; i < input.properties.length; i++) {
		const property = input.properties[i];
		object[property] = data.content[0].saves[property];
	}
	// Return outcome of the request
	return res.send({ status: "succeeded", content: object });
}

// HELPER ===================================================

// END  =====================================================
