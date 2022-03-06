// TODO: Integration - Review
// IMPORT ===================================================

import axios from "axios";

// TEST OUTPUT ==============================================

const DUMMY_CONTENT = { done: true };

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	if (req.body.API_KEY_PUBLIC !== process.env.API_KEY_PUBLIC) {
		return res.send({ status: "critical error" });
	}
	const input = req.body.input;
	// Check the provider
	// Check if the password match
	let data1;
	try {
		data1 = (
			await axios.post(process.env.PREFIX_BACKEND + "/account/match-password", {
				API_KEY_PRIVATE: process.env.API_KEY_PRIVATE,
				input: {
					email: input.email,
					password: input.oldPassword,
				},
			})
		)["data"];
	} catch (error) {
		data1 = { status: "error", content: error };
	}

	if (data1.status !== "succeeded") {
		if (data1.status === "failed" && data1.content.account) {
			if (data1.content.account === "does not exist") return res.send({ status: "failed", content: "no account" });
		} else {
			return res.send({ status: "error" });
		}
	}
	if (!data1.content) return res.send({ status: "failed", content: "incorrect" });
	// Change the password
	let data2;
	try {
		data2 = (
			await axios.post(process.env.PREFIX_BACKEND + "/account/reset-password/set", {
				API_KEY_PRIVATE: process.env.API_KEY_PRIVATE,
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
