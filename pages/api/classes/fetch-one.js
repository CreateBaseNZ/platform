// TODO: Integration - Documented

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
	if (req.body.API_KEY_PUBLIC !== process.env.API_KEY_PUBLIC) {
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
	console.log("fetching");
	try {
		data1 = (
			await axios.post(process.env.PREFIX_BACKEND + "/class/retrieve", {
				API_KEY_PRIVATE: process.env.API_KEY_PRIVATE,
				input: {
					query: { _id: input.classId },
					option: { license: [], profile: [], account: [] },
				},
			})
		)["data"];
	} catch (error) {
		data1 = { status: "error", content: error };
	}
	console.log(data1);
	if (data1.status !== "succeeded") return res.send({ status: "error" });
	// Construct the success object
	const data = { status: "succeeded", content: constructClass(data1.content[0]) };
	return res.send(data);
}

// HELPERS ==================================================

const constructClass = (instance) => {
	let teachers = instance.licenses.active.filter((license) => license.role === "teacher" || license.role === "admin");
	teachers = teachers.map((license) => {
		return {
			alias: license.metadata.alias,
			email: license.profile.account.email,
			firstName: license.profile.name.first,
			lastName: license.profile.name.last,
			licenseId: license._id,
		};
	});
	let students = instance.licenses.active.filter((license) => license.role === "student");
	students = students.map((license) => {
		return {
			licenseId: license._id,
			firstName: license.profile.name.first,
			lastName: license.profile.name.last,
			email: license.profile.account.local ? license.profile.account.local.email : license.profile.account.google.email,
			profileId: license.profile,
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
