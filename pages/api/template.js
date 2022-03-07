// TODO: Integration - Backend

// IMPORT ===================================================

import axios from "axios";

// TEST OUTPUT ==============================================

const DUMMY_OUTPUT = {};

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	if (req.body.API_KEY_PUBLIC !== process.env.API_KEY_PUBLIC) {
		return res.send({ status: "critical error" });
	}
	const input = req.body.input;
	// Test Logic
	let data;
	if (req.body.status === "succeeded") {
		data = {
			status: "succeeded",
			content: DUMMY_OUTPUT, // could also return nothing as succeeded will automatically indicate successful verification
		};
	} else if (req.body.status === "failed 1") {
		data = {
			status: "failed",
			content: "",
		};
	} else if (req.body.status === "failed 2") {
		data = {
			status: "failed",
			content: "",
		};
	}
	// Integration Logic
	let data1;
	try {
		data1 = (await axios.post(process.env.PREFIX_BACKEND + "/", { API_KEY_PRIVATE: process.env.API_KEY_PRIVATE, input: {} }))["data"];
	} catch (error) {
		data1 = { status: "error", content: error };
	}
	if (data1.status !== "succeeded") return res.send({ status: "error" });
	return res.send(data);
}

// HELPERS ==================================================

// END ======================================================
