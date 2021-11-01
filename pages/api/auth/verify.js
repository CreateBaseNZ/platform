// TODO: Integration - Backend
// IMPORT ===================================================

import axios from "axios";

// TEST OUTPUT ==============================================

const DUMMY_VERIFY = {
	verified: true,
};

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
	// 		content: DUMMY_VERIFY, // could also return nothing as succeeded will automatically indicate successful verification
	// 	};
	// } else if (req.body.status === "failed 1") {
	// 	data = {
	// 		status: "failed",
	// 		content: "incorrect",
	// 	};
	// } else if (req.body.status === "failed 2") {
	// 	data = {
	// 		status: "failed",
	// 		content: "expired",
	// 	};
	// }
	// Integration Logic
	let data;
	try {
		data = (
			await axios.post(process.env.ROUTE_URL + "/account/verification/verify", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: { email: input.email, code: input.code, date: input.date },
			})
		)["data"];
	} catch (error) {
		data = { status: "error", content: error };
	}
	if (data.status !== "succeeded") {
		if (data.content.code === "incorrect") {
			return res.send({ status: "failed", content: "incorrect" });
		} else {
			return res.send({ status: "error" });
		}
	}
	return res.send({ status: "succeeded", content: { verified: true } });
}

// HELPERS ==================================================

// END ======================================================
