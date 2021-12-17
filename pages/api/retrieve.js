// TODO: Integration - Backend

// IMPORT ===================================================

import axios from "axios";

// TEST OUTPUT ==============================================

const DUMMY_OUTPUT = [];

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error" });
	}
	const input = req.body.input; // array of strings
	// Test Logic
	let data;
	if (req.body.status === "succeeded") {
		data = {
			status: "succeeded",
			content: DUMMY_OUTPUT,
		};
	}
	// Integration Logic
	// let data1;
	// try {
	// 	data1 = (await axios.post(process.env.ROUTE_URL + "/", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input: {} }))["data"];
	// } catch (error) {
	// 	data1 = { status: "error", content: error };
	// }
	// if (data1.status !== "succeeded") return res.send({ status: "error" });
	return res.send(data);
}

// HELPERS ==================================================

// END ======================================================
