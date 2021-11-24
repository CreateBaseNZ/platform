// TODO: Integration - Documented

// IMPORT ===================================================

import axios from "axios";

// TEST OUTPUT ==============================================

// MAIN =====================================================

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
	// Filter the classes
	// status [str] : joined | requested
	let classes = [];
	classes = classes.concat(
		constructClasses(
			_data.content[0].classes.filter((instance) => {
				return instance.licenses.active.find((license) => license._id.toString() === input.licenseId.toString());
			}),
			"joined"
		)
	);
	classes = classes.concat(
		constructClasses(
			_data.content[0].classes.filter((instance) => {
				return instance.licenses.requested.find((license) => license._id.toString() === input.licenseId.toString());
			}),
			"requested"
		)
	);
	classes = classes.concat(
		constructClasses(
			_data.content[0].classes.filter((instance) => {
				return instance.licenses.invited.find((license) => license._id.toString() === input.licenseId.toString());
			}),
			"invited"
		)
	);
	// Construct the success object
	const data = { status: "succeeded", content: classes };
	return res.send(data);
}

// HELPERS ==================================================

const constructClasses = (classes, status) => {
	return classes.map((instance) => {
		let teachers = instance.licenses.active.filter((license) => license.role === "teacher" || license.role === "admin");
		teachers = teachers.map((license) => {
			return license.metadata.alias;
		});
		return {
			id: instance._id,
			name: instance.name,
			teachers,
			numOfStudents: instance.licenses.active.filter((license) => license.role === "student").length,
			status,
		};
	});
};

// END ======================================================
