// TODO: Integration - Review
// IMPORT ===================================================

import axios from "axios";

// TEST OUTPUT ==============================================

const DUMMY_CONTENT = { done: true };

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
	// 		content: DUMMY_CONTENT, // content not required; returning just the succeeded status is sufficient
	// 	};
	// } else if (req.body.status === "failed 1") {
	// 	data = {
	// 		status: "failed",
	// 		content: "incorrect",
	// 	};
	// }
	// Integration Logic
	// Check if the password match
	let data1;
	try {
		data1 = (
			await axios.post(process.env.ROUTE_URL + "/account/match-password", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: {
					email: input.email,
					password: input.oldPassword,
				},
			})
		)["data"];
	} catch (error) {
		data1 = { status: "error", content: error };
	}
	if (data1.status !== "succeeded") return res.send({ status: "error" });
	if (!data1.content) return res.send({ status: "failed", content: "incorrect" });
	// Change the password
	let data2;
	try {
		data2 = (
			await axios.post(process.env.ROUTE_URL + "/account/reset-password/set", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: { email: input.email, password: input.password, date: input.date },
			})
		)["data"];
	} catch (error) {
		data2 = { status: "error", content: error };
	}
	if (data2.status !== "succeeded") return res.send({ status: "error" });
	return res.send({ status: "succeeded" });
}

// HELPERS ==================================================

// END ======================================================
