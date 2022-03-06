// TODO: Integration - Review
// IMPORT ===================================================

import axios from "axios";

// TEST OUTPUT ==============================================

const DUMMY_RECOVER = {
	verified: true,
};

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	if (req.body.API_KEY_PUBLIC !== process.env.API_KEY_PUBLIC) {
		return res.send({ status: "critical error" });
	}
	const input = req.body.input;
	// // Test Logic
	// let data;
	// if (req.body.status === "succeeded") {
	// 	data = {
	// 		status: "succeeded",
	// 		content: DUMMY_RECOVER, // could also return nothing as succeeded will automatically indicate successful verification
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
			await axios.post(process.env.PREFIX_BACKEND + "/account/reset-password/verify", {
				API_KEY_PRIVATE: process.env.API_KEY_PRIVATE,
				input: { email: input.email, code: input.code },
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
	return res.send(data);
}

// HELPERS ==================================================

// END ======================================================
