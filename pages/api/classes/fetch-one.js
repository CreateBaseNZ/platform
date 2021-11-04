// TODO: Integration - Backend

// IMPORT ===================================================

import axios from "axios";

// TEST OUTPUT ==============================================

const DUMMY_CLASS_DATA = {
	id: "room21id",
	name: "Room 21",
	teachers: ["Mrs Mints"],
	students: [
		{ firstName: "Jack", lastName: "Pumpkin" },
		{ firstName: "Jane", lastName: "Passionfruit" },
		{ firstName: "Joe", lastName: "Mango" },
	],
	announcements: {},
	assignments: {},
	// more properties TBD
};

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
			content: DUMMY_CLASS_DATA,
		};
	} else if (req.body.status === "failed 1") {
		data = {
			status: "failed",
			content: "not found",
		};
	}
	return res.send(data);
}

// HELPERS ==================================================

// END ======================================================
