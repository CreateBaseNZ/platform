// TODO: Integration - Review

// IMPORT ===================================================

import axios from "axios";

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	if (req.body.API_KEY_PUBLIC !== process.env.API_KEY_PUBLIC) {
		return res.send({ status: "critical error" });
	}
	const input = req.body.input;
	// Integration Logic
	// TODO: Validate Authorisation
	// Delete the class
	let data2;
	try {
		data2 = (
			await axios.post(process.env.PREFIX_BACKEND + "/class/delete", {
				API_KEY_PRIVATE: process.env.API_KEY_PRIVATE,
				input: { query: { _id: input.classId }, date: input.date },
			})
		)["data"];
	} catch (error) {
		data2 = { status: "error", content: error };
	}
	if (data2.status !== "succeeded") return res.send({ status: "error" });
	return res.send({ status: "succeeded" });
}
