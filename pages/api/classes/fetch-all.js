// TODO: Integration - Documented
// TODO: Add status property to returned objects

// IMPORT ===================================================

import axios from "axios";

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
	const data = { status: "succeeded", content: constructClasses(_data.content[0].classes, input.licenseId) };
	console.log(data);
	return res.send(data);
}

// HELPERS ==================================================

const constructClasses = (classes, licenseId) => {
	return classes.map((instance) => {
		let teachers = instance.licenses.active.filter((document) => document.role === "teacher" || document.role === "admin");
		teachers = teachers.map((document) => {
			return document.metadata.alias;
		});
		let status;
		if (instance.licenses.active.find((document) => document._id.toString() === licenseId.toString())) {
			status = "joined";
		} else if (instance.licenses.requested.find((document) => document._id.toString() === licenseId.toString())) {
			status = "requested";
		} else if (instance.licenses.invited.find((document) => document._id.toString() === licenseId.toString())) {
			status = "invited";
		} else {
			status = "";
		}
		return {
			id: instance._id,
			name: instance.name,
			teachers,
			numOfStudents: instance.licenses.active.filter((document) => document.role === "student").length,
			status,
		};
	});
};

// END ======================================================
