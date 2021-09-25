// IMPORT ===================================================

import axios from "axios";

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	// Validate PUBLIC_API_KEY
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.status(403).send({ status: "critical error", content: "Invalid API Key" });
	}
	// Create the input data
	// const input = { email: "clin750@aucklanduni.ac.nz" };
	// const input = { email: "bbur543@uoa.auckland.ac.nz" };
	// const input = { email: "cvel317@aucklanduni.ac.nz" };
	// Send the data to the main backend
	let data;
	try {
		data = (await axios.post(process.env.ROUTE_URL + "/send-test-email", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input }))["data"];
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
