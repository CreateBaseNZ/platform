// TODO: Integration - Review
// IMPORT ===================================================

import axios from "axios";

// TEST OUTPUT ==============================================

const DUMMY_SENT = {
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
	// 		content: DUMMY_SENT, // could also return nothing as succeeded will automatically indicate successful verification
	// 	};
	// }
	// Integration Logic
	let data;
	try {
		data = (
			await axios.post(process.env.PREFIX_BACKEND + "/account/reset-password/email", {
				API_KEY_PRIVATE: process.env.API_KEY_PRIVATE,
				input: { email: input.email, date: input.date },
			})
		)["data"];
	} catch (error) {
		data = { status: "error", content: error };
	}
	return res.send(data);
}

// HELPERS ==================================================

// END ======================================================
