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
	let status;
	if (input.role === "teacher" || input.role === "admin") {
		status = "activated";
	} else {
		status = "requested";
	}
	let data;
	try {
		data = (
			await axios.post(process.env.ROUTE_URL + "/class/add-member", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: { class: input.classId, license: input.licenseId, date: input.date, status },
			})
		)["data"];
	} catch (error) {
		data = { status: "error", content: error };
	}
	if (data.status !== "succeeded") return res.send({ status: "error" });
	return res.send({ status: "succeeded" });
}
