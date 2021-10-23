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
		// Validate a user is logged in
		return res.send({ status: "critical error", content: "" });
	} else if (!session.user.organisation) {
		// Validate the user is in an organisation
		return res.send({ status: "critical error", content: "" });
	} else if (session.user.access !== "admin" && session.user.access !== "educator" /*|| !session.user.verified*/) {
		// Validate if the user is an admin
		return res.send({ status: "critical error", content: "" });
	}
	// Create the input data
	const input = { emails: req.body.input.emails, organisation: session.user.organisation, profile: session.user.profile };
	// TODO: Validate input data
	// Send the request to the main backend
	let data;
	try {
		data = (await axios.post(process.env.ROUTE_URL + "/organisation/invite-educator/send", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input }))["data"];
	} catch (error) {
		return res.send({ status: "error", content: error });
	}
	// Return the response of the request
	return res.send(data);
}

// SECONDARY ================================================

// HELPER ===================================================
