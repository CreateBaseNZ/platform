// IMPORT ===================================================

import axios from "axios";
import { getSession } from "next-auth/client";

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	// Validate PUBLIC_API_KEY
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.status(403).send({ status: "critical error", content: "Invalid API Key" });
	}
	// Create the input data
	let input;
	// Check if a session exist
	const session = await getSession({ req });
	if (session) {
		if (session.user.verified) {
			return res.status(400).send({ status: "critical error", content: "This user is already verified" });
		}
		input = { account: session.user.account };
	} else {
		input = { email: req.body.input.email };
	}
	input.code = req.body.input.code;
	// Send the data to the main backend
	let data;
	try {
		data = (await axios.post("https://createbase.co.nz/verify-account", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input }))["data"];
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
