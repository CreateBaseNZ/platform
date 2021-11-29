// TODO: Integration - Review

// IMPORT ===================================================

import axios from "axios";

// TEST OUTPUT ==============================================

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error" });
	}
	const input = req.body.input;
	// Integration Logic
	for (let i = 0; i < input.licenseIds.length; i++) {
		const licenseId = input.licenseIds[i];
		let data;
		try {
			data = (
				await axios.post(process.env.ROUTE_URL + "/license/update", {
					PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
					input: {
						query: { _id: licenseId, group: input.groupId },
						updates: [{ type: "role", update: "admin" }],
						date: input.date,
					},
				})
			)["data"];
		} catch (error) {
			data = { status: "error", content: error };
		}
		if (data.status !== "succeeded") return res.send({ status: "error" });
	}
	return res.send({ status: "succeeded" });
}

// HELPERS ==================================================

// END ======================================================
