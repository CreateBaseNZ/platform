// IMPORT ===================================================

import axios from "axios";

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	// Validate PUBLIC_API_KEY
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error", content: "" });
	}
	const input = req.body.input;
	// Construct the updates array
	let updates = [];
	for (let i = 0; i < input.updates.length; i++) {
		const update = input.updates[i];
		updates.push({
			type: "saves",
			update,
		});
	}
	// Create the input data
	let input = {
		query: { _id: input.profileId },
		updates,
		date: input.date,
	};
	// Send the data to the main backend
	let data;
	try {
		data = (await axios.post(process.env.ROUTE_URL + "/profile/update", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input }))["data"];
	} catch (error) {
		return res.send({ status: "error", content: error });
	}
	// Return outcome of the request
	return res.send(data);
}

// SECONDARY ================================================

// HELPER ===================================================
