// TODO: Integration - Review
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
	let data1;
	try {
		data1 = (await axios.post(process.env.ROUTE_URL + "/signup", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input }))["data"];
	} catch (error) {
		return res.send({ status: "error", content: error });
	}
	const account = data1.content.account;
	// Send verification code
	let data2;
	try {
		data2 = (
			await axios.post(process.env.ROUTE_URL + "/account/verification/email", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: { account: account._id, date: input.date },
			})
		)["data"];
	} catch (error) {
		data2 = { status: "error", content: error };
	}
	if (data2.status !== "succeeded") return res.send({ status: "error" });
	// Return outcome of the request
	return res.send({ status: "succeeded" });
}

// HELPERS ==================================================

// END ======================================================
