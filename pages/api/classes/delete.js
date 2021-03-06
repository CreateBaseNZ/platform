// TODO: Integration - Review

// IMPORT ===================================================

import axios from "axios";

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error" });
	}
	const input = req.body.input;
	// Integration Logic
	// TODO: Validate Authorisation
	// Delete the class
	let data2;
	try {
		data2 = (
			await axios.post(process.env.ROUTE_URL + "/class/delete", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: { query: { _id: input.classId }, date: input.date },
			})
		)["data"];
	} catch (error) {
		data2 = { status: "error", content: error };
	}
	if (data2.status !== "succeeded") return res.send({ status: "error" });
	return res.send({ status: "succeeded" });
}
