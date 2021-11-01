// TODO: Integration - Backend
// IMPORT ===================================================

import axios from "axios";

// OUTPUT ===================================================

const DUMMY_GROUP = {
	id: "mit",
	name: "Massachusetts Institute of Technology",
	role: "student",
	numOfUsers: { admins: 2, teachers: 5, students: 350 },
	type: "school",
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
			content: DUMMY_GROUP,
		};
	} else if (req.body.status === "failed 1") {
		data = {
			status: "failed",
			content: "incorrect",
		};
	} else if (req.body.status === "failed 2") {
		data = {
			status: "failed",
			content: "expired",
		};
	} else if (req.body.status === "failed 3") {
		data = {
			status: "failed",
			content: "already joined",
		};
	}
	return res.send(data);
}

// HELPER ===================================================

// END  =====================================================
