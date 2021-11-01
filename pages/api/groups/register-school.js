// TODO integration

// IMPORT ===================================================

import axios from "axios";

// OUTPUT ===================================================

const DUMMY_SENT = {
	sent: true,
};

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error" });
	}
	let data;
	// Test Logic
	if (req.body.status === "succeeded") {
		data = {
			status: "succeeded",
			content: DUMMY_SENT, // does not require content
		};
	}
	return res.send(data);
}

// HELPER ===================================================

// END  =====================================================
