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
	// Create the input data
	const input = {
		email: req.body.input.email,
		eduCode: req.body.input.eduCode,
		orgName: req.body.input.orgName,
		orgId: req.body.input.orgId,
		joinCode: req.body.input.joinCode,
		date: req.body.input.date,
	};
	// TODO: Validate input data
	// Send the request to the main backend
	let data;
	try {
		data = (await axios.post(process.env.ROUTE_URL + "/organisation/educator-join/accept", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input }))["data"];
	} catch (error) {
		return res.send({ status: "error", content: error });
	}
	// Return the response of the request
	return res.send(data);
}

// SECONDARY ================================================

// HELPER ===================================================
