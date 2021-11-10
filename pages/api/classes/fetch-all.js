// TODO: Integration - Backend
// I've also renamed the previous fetch-all route to fetch-joined
// Not sure if this affects any backend routes

// IMPORT ===================================================

import axios from "axios";

// TEST OUTPUT ==============================================

const DUMMY_CLASSES = [
	{ id: "room21id", name: "Room 21", joined: true },
	{ id: "room26id", name: "Room 26", joined: false },
	{ id: "dfsg4", name: "Room 28", joined: true },
	{ id: "5ythfdg", name: "Room 29", joined: true },
	{ id: "dsfasd", name: "Room 27", joined: false },
	{ id: "asd", name: "Room 27", joined: false },
	{ id: "hgjk", name: "Room 27", joined: false },
	{ id: "uio", name: "Room 27", joined: false },
	{ id: "2345", name: "Room 27", joined: false },
];

// MAIN =====================================================

// profile and license ID are both passed as input

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
	} // no failure modes
	return res.send(data);
}
