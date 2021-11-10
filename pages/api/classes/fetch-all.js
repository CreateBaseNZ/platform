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
	const input = req.body.input;
	let _data;
	try {
		_data = (
			await axios.post(process.env.ROUTE_URL + "/group/retrieve", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: {
					query: { _id: input.schoolId },
					option: { class: [], license: [], profile: [] },
				},
			})
		)["data"];
	} catch (error) {
		_data = { status: "error", content: error };
	}
	if (_data.status !== "succeeded") return res.send({ status: "error" });
	// Construct the success object
	const data = { status: "succeeded", content: constructClasses(_data.content[0].classes) };
	return res.send(data);
}

// HELPERS ==================================================

const constructClasses = (classes) => {
	return classes.map((instance) => {
		let teachers = instance.licenses.filter((license) => license.role === "teacher" || license.role === "admin");
		teachers = teachers.map((license) => {
			return license.metadata.alias;
		});
		return {
			id: instance._id,
			name: instance.name,
			teachers,
			numOfStudents: instance.licenses.filter((license) => license.role === "student").length,
		};
	});
};

// END ======================================================
