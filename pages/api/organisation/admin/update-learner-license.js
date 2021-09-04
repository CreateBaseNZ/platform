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
	// Perform access validation
	const session = await getSession({ req });
	if (!session) {
		// Validate a user is logged in
		return res.send({ status: "critical error", content: "" });
	} else if (!session.user.organisation) {
		// Validate the user is in an organisation
		return res.send({ status: "critical error", content: "" });
	} else if (session.user.access !== "admin" /*|| !session.user.verified*/) {
		// Validate if the user is an admin
		return res.send({ status: "critical error", content: "" });
	}
	// Create the input data
	let input = {
		organisation: session.user.organisation,
		username: req.body.input.username,
		date: req.body.input.date,
		updates: {},
	};
	if (req.body.input.updates.username) input.updates.username = req.body.input.updates.username;
	if (req.body.input.updates.password) input.updates.password = req.body.input.updates.password;
	// TODO: Validate the input data
	// Send the request to the main backend
	let data;
	try {
		data = (await axios.post("https://createbase.co.nz/organisation/admin/update-learner-license", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input }))["data"];
	} catch (error) {
		return res.send({ status: "error", content: error });
	}
	// Return the response of the request
	return res.send(data);
}

// SECONDARY ================================================

// HELPER ===================================================
