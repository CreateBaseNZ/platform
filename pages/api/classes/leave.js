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
	// TODO: Check if the teacher leaving is the last one in the class
	// Remove the member
	let data;
	try {
		data = (
			await axios.post(process.env.ROUTE_URL + "/class/remove-member", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: {
					query: { class: { _id: input.classId }, license: { _id: input.licenseId } },
					date: input.date,
					status: "activated",
				},
			})
		)["data"];
	} catch (error) {
		data = { status: "error", content: error };
	}
	if (data.status !== "succeeded") return res.send({ status: "error" });
	return res.send({ status: "succeeded" });
}
