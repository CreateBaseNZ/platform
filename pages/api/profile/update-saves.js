// IMPORT ===================================================

import axios from "axios";

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	// Validate PUBLIC_API_KEY
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error" });
	}
	const input = req.body.input;
	// Send the data to the main backend
	const url = process.env.ROUTE_URL + "/profile/update";
	const keys = { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY };
	let data;
	try {
		data = (
			await axios.post(url, {
				...keys,
				input: {
					query: { _id: input.profileId },
					updates: [{ type: "saves", update: input.update }],
					date: input.date,
				},
			})
		)["data"];
	} catch (error) {
		return res.send({ status: "error", content: error });
	}
	// Return outcome of the request
	return res.send(data);
}

// HELPER ===================================================

// END  =====================================================
