// TODO: Integration - Review
// IMPORT ===================================================

import axios from "axios";

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	// Validate API_KEY_PUBLIC
	if (req.body.API_KEY_PUBLIC !== process.env.API_KEY_PUBLIC) {
		return res.send({ status: "critical error" });
	}
	const input = req.body.input;
	// Send the data to the main backend
	let data;
	try {
		data = (
			await axios.post(process.env.PREFIX_BACKEND + "/license/update", {
				API_KEY_PRIVATE: process.env.API_KEY_PRIVATE,
				input: {
					query: { _id: input.licenseId },
					updates: [{ type: "metadata", update: input.update }],
					date: input.date,
				},
			})
		)["data"];
	} catch (error) {
		data = { status: "error", content: error };
	}
	if (data.status !== "succeeded") return res.send({ status: "error" });
	// Return outcome of the request
	return res.send(data);
}

// HELPER ===================================================

// END  =====================================================
