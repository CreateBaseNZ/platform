// IMPORT ===================================================

import axios from "axios";

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error" });
	}
	const input = req.body.input;
	const url = process.env.ROUTE_URL + "/tracking";
	const keys = { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY };
	// Integration Logic
	let data;
	try {
		data = (await axios.post(url, { ...keys }))["data"];
	} catch (error) {
		data = { status: "error", content: error };
	}
	return res.send(data);
}

// HELPERS ==================================================

// END ======================================================
