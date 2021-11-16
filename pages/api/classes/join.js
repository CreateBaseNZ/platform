// TODO: Integration - Test

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
	// // Test Logic
	// let data;
	// if (req.body.status === "succeeded") {
	// 	data = {
	// 		status: "succeeded",
	// 		content: {}, // return nothing
	// 	};
	// } // no failure modes that I can think of
	// return res.send(data);
	// Integration Logic
	let status;
	if (input.role === "teacher" || input.role === "admin") {
		status = "activated";
	} else {
		status = "requested";
	}
	for (let i = 0; i < input.classIds.length; i++) {
		let data;
		try {
			data = (
				await axios.post(process.env.ROUTE_URL + "/class/add-member", {
					PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
					input: { class: input.classIds[i], license: input.licenseId, date: input.date, status },
				})
			)["data"];
		} catch (error) {
			data = { status: "error", content: error };
		}
		if (data.status !== "succeeded") return res.send({ status: "error" });
	}
	return res.send({ status: "succeeded" });
}
