// TODO: Integration - Backend
// I've also renamed the previous fetch-all route to fetch-joined
// Not sure if this affects any backend routes

// IMPORT ===================================================

import axios from "axios";

// TEST OUTPUT ==============================================

const DUMMY_CLASSES = [
	{ id: "room21id", name: "Room 21", teachers: ["Mrs Mints"], numOfStudents: 12 },
	{ id: "room26id", name: "Room 26", teachers: ["Mr Bumblebee"], numOfStudents: 25 },
	{ id: "dfsg4", name: "Room 28", teachers: ["Mr Bumblebee"], numOfStudents: 24 },
	{ id: "5ythfdg", name: "Room 29", teachers: ["Mr Bumblebee"], numOfStudents: 23 },
	{ id: "dsfasd", name: "Room 27", teachers: ["Mr Bumblebee"], numOfStudents: 22 },
];

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error" });
	}
	// Test Logic
	console.log("api running");
	let data;
	if (req.body.status === "succeeded") {
		data = {
			status: "succeeded",
			content: DUMMY_CLASSES,
		};
	} // no failure modes
}
