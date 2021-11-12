// TODO: Integration - Test

// IMPORT ===================================================

import axios from "axios";

// TEST OUTPUT ==============================================

const DUMMY_CLASS_DATA = {
	id: "room21id",
	name: "Room 21",
	teachers: ["Mrs Mints"],
	students: [
		{ firstName: "Jack", lastName: "Pumpkin", email: "email@email.com" },
		{ firstName: "Jane", lastName: "Passionfruit", email: "email@email.com" },
		{ firstName: "Joe", lastName: "Mango", email: "email@email.com" },
	],
	announcements: [],
	assignments: [],
	// more properties TBD
};

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error" });
	}
	const input = req.body.input;
	// // Test Logic
	// let data;
	// if (req.body.status === "succeeded") {
	// 	data = {
	// 		status: "succeeded",
	// 		content: DUMMY_CLASS_DATA,
	// 	};
	// } else if (req.body.status === "failed 1") {
	// 	data = {
	// 		status: "failed",
	// 		content: "not found",
	// 	};
	// }
	// Integration Logic
	let data1;
	try {
		data1 = (
			await axios.post(process.env.ROUTE_URL + "/class/retrieve", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: {
					query: { _id: input.classId },
					option: { license: [], profile: [], account: [] },
				},
			})
		)["data"];
	} catch (error) {
		data1 = { status: "error", content: error };
	}
	if (data1.status !== "succeeded") return res.send({ status: "error" });
	// Construct the success object
	const data = { status: "succeeded", content: constructClass(data1.content[0]) };
	return res.send(data);
}

// HELPERS ==================================================

const constructClass = (instance) => {
	let teachers = instance.licenses.active.filter((license) => license.role === "teacher" || license.role === "admin");
	teachers = teachers.map((license) => {
		return license.metadata.alias;
	});
	let students = instance.licenses.active.filter((license) => license.role === "student");
	students = students.map((license) => {
		return {
			licenseId: license._id,
			firstName: license.profile.name.first,
			lastName: license.profile.name.last,
			email: license.profile.account.email,
		};
	});
	return {
		id: instance._id,
		name: instance.name,
		teachers,
		students,
		announcements: {},
		assignments: {},
	};
};

// END ======================================================
