// IMPORT ===================================================

import axios from "axios";

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	// Validate PUBLIC_API_KEY
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error", content: "" });
	}
	// Create the input data
	const input = { email: req.body.input.email };
	// Send the data to the main backend
	let data;
	try {
		data = (await axios.post(process.env.ROUTE_URL + "/send-reset-password-email", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input }))["data"];
	} catch (error) {
		return res.send({ status: "error", content: error });
	}
	// Success handler
	return res.send(data);
}
