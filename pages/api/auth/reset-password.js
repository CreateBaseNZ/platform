// IMPORT ===================================================

import axios from "axios";
import { getSession } from "next-auth/client";

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	// Validate PUBLIC_API_KEY
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error", content: "Invalid API key" });
	}
	// Create the input data
	const input = {
		email: req.body.input.email,
		password: req.body.input.password,
		code: req.body.input.code,
	};
	// Send the data to the main backend
	let data;
	try {
		data = (await axios.post("https://createbase.co.nz/reset-password", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input }))["data"];
	} catch (error) {
		return res.send({ status: "error", content: error });
	}
	// Success handler
	return res.send(data);
}
