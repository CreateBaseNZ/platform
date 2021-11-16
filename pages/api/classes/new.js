// TODO: Integration - Test

// IMPORT ===================================================

import axios from "axios";

// TEST OUTPUT ==============================================

const DUMMY_OUTPUT = {
	id: "room12id",
	name: "Room 23",
	teachers: ["Mrs Applecrumb"],
	numOfStudents: 23,
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
	// 		content: DUMMY_OUTPUT,
	// 	};
	// } else if (req.body.status === "failed 1") {
	// 	data = {
	// 		status: "failed",
	// 		content: "taken",
	// 	};
	// }
	// Integration Logic
	// Create the class
	let data1;
	try {
		data1 = (
			await axios.post(process.env.ROUTE_URL + "/class/create", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: {
					group: input.groupId,
					name: input.name,
					date: input.date,
					subject: input.subject,
				},
			})
		)["data"];
	} catch (error) {
		data1 = { status: "error", content: error };
	}
	if (data1.status !== "succeeded") {
		if (data1.content.class === "taken") {
			return res.send({ status: "failed", content: "taken" });
		} else {
			return res.send({ status: "error" });
		}
	}
	// Add the creator as the first teacher
	let data2;
	try {
		data2 = (
			await axios.post(process.env.ROUTE_URL + "/class/add-member", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: {
					class: data1.content.class._id,
					license: input.licenseId,
					date: input.date,
					status: "activated",
				},
			})
		)["data"];
	} catch (error) {
		data2 = { status: "error", content: error };
	}
	if (data2.status !== "succeeded") return res.send({ status: "error" });
	// Construct the return object
	const data = {
		status: "succeeded",
		content: {
			id: data1.content.class._id,
			name: data1.content.class.name,
			teachers: [input.alias],
			numOfStudents: 0,
		},
	};
	// Success handler
	return res.send(data);
}

// HELPERS ==================================================

// END ======================================================
