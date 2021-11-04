// TODO: Integration - Backend

// IMPORT ===================================================

import axios from "axios";

// TEST OUTPUT ==============================================

const DUMMY_CLASSES = [
	{ id: "room21id", name: "Room 21", teachers: ["Mrs Mints"], numOfStudents: 12 },
	{ id: "room26id", name: "Room 26", teachers: ["Mr Bumblebee"], numOfStudents: 28 },
];

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error" });
	}
	// Test Logic
	let data;
	if (req.body.status === "succeeded") {
		data = {
			status: "succeeded",
			content: DUMMY_CLASSES,
		};
	} // no failed modes for this route
	return res.send(data);
}

// HELPERS ==================================================

// END ======================================================
