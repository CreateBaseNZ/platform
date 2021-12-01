// TODO: Integration - Documentation complete
// IMPORT ===================================================

import axios from "axios";

// TEST OUTPUT ==============================================

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) return res.send({ status: "critical error" });
	const input = req.body.input;

	const url = process.env.ROUTE_URL + "/error/new";
	const keys = { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY };
	const backendInput = { email: input.email, profile: input.profile, route: input.route, type: input.type, date: input.date, metadata: input.metadata };
	let data;
	try {
		data = (await axios.post(url, { ...keys, input: backendInput }))["data"];
	} catch (error) {
		data = { status: "error", content: error };
	}
	if (data.status !== "succeeded") return res.send({ status: "error" });
	return res.send({ status: "succeeded" });
}

// HELPERS ==================================================

// END ======================================================
