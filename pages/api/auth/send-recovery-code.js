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
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
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
			await axios.post(process.env.ROUTE_URL + "/account/reset-password/email", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
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
