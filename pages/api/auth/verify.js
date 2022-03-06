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
	// Verify the account
	let account;
	try {
		account = await verify(input.email, input.code, input.date);
	} catch (error) {
		return res.send(error);
	}
	// Send the welcome email
	try {
		await sendEmail(account);
	} catch (error) {
		return res.send(error);
	}
	// Success handler
	return res.send({ status: "succeeded", content: { verified: true } });
}

// HELPERS ==================================================

function verify(email, code, date) {
	return new Promise(async (resolve, reject) => {
		// Construct the input object
		const input = { email, code, date };
		console.log(input);
		// Send the processing request
		let data;
		try {
			data = (await axios.post(process.env.PREFIX_BACKEND + "/account/verification/verify", { API_KEY_PRIVATE: process.env.API_KEY_PRIVATE, input }))["data"];
		} catch (error) {
			data = { status: "error", content: error };
		}
		// Error handler
		if (data.status !== "succeeded") {
			if (data.content.code === "incorrect") {
				return reject({ status: "failed", content: "incorrect" });
			} else {
				return reject({ status: "error" });
			}
		}
		// Success handler
		return resolve(data.content);
	});
}

function sendEmail(account) {
	return new Promise(async (resolve, reject) => {
		// Construct the input object
		const input = {
			user: { accountId: account._id, provider: "credentials" },
			option: { recipient: account.email, receive: "welcome", notification: "onboarding", tone: "friendly" },
		};
		// Send the processing request
		let data;
		try {
			data = (await axios.post(process.env.PREFIX_BACKEND + "/mail/send-email", { API_KEY_PRIVATE: process.env.API_KEY_PRIVATE, input }))["data"];
		} catch (error) {
			data = { status: "error", content: error };
		}
		// Error handler
		if (data.status !== "succeeded") return reject({ status: "error" });
		// Success handler
		return resolve();
	});
}

// END ======================================================
