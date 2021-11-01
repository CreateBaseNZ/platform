// TODO: Integration - Backend
// TODO depends on auth to be completed - will need to be reviewed

// IMPORT ===================================================

import axios from "axios";

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	// Validate PUBLIC_API_KEY
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error" });
	}
	// Create the input data
	const input = {
		email: req.body.input.email,
		password: req.body.input.password,
		name: {
			first: req.body.input.firstName,
			last: req.body.input.lastName,
		},
		date: req.body.input.date,
	};
	// Create the user account and profile
	let data;
	try {
		data = (await axios.post(process.env.ROUTE_URL + "/signup", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input }))["data"];
	} catch (error) {
		return res.send({ status: "error", content: error });
	}
	// Clear the content
	if (data.status === "succeeded") data.content = undefined;
	// Return outcome of the request
	return res.send(data);
}

// HELPERS ==================================================

// END ======================================================
