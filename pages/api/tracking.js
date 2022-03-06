// IMPORT ===================================================

import axios from "axios";

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	if (req.body.API_KEY_PUBLIC !== process.env.API_KEY_PUBLIC) {
		return res.send({ status: "critical error" });
	}
	const input = req.body.input;
	const url = process.env.PREFIX_BACKEND + "/tracking";
	const keys = { API_KEY_PRIVATE: process.env.API_KEY_PRIVATE };
	// Integration Logic
	let data;
	try {
		data = (await axios.post(url, { ...keys, input }))["data"];
	} catch (error) {
		data = { status: "error", content: error };
	}
	return res.send(data);
}

// HELPERS ==================================================

// END ======================================================
