// TODO: Integration - Backend
// IMPORT ===================================================

import axios from "axios";

// OUTPUT ===================================================

const DUMMY_GROUP = {
	id: "mit",
	name: "Massachusetts Institute of Technology",
	role: "student",
	numOfUsers: { admins: 2, teachers: 5, students: 350 },
	type: "school",
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
	// 		content: DUMMY_GROUP,
	// 	};
	// } else if (req.body.status === "failed 1") {
	// 	data = {
	// 		status: "failed",
	// 		content: "incorrect",
	// 	};
	// } else if (req.body.status === "failed 2") {
	// 	data = {
	// 		status: "failed",
	// 		content: "expired",
	// 	};
	// } else if (req.body.status === "failed 3") {
	// 	data = {
	// 		status: "failed",
	// 		content: "already joined",
	// 	};
	// }
	// Integration Logic
	// Fetch the group with the specified student code
	let data1;
	try {
		data1 = (
			await axios.post(process.env.ROUTE_URL + "/group/retrieve-by-code", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: { role: "school-student", code: input.code, option: { license: [] } },
			})
		)["data"];
	} catch (error) {
		data1 = { status: "error", content: error };
	}
	const group = data1.content;
	// Check if a group with the specified student code exist
	if (data1.status === "failed" && data1.content.group) {
		return res.send({ status: "failed", content: "incorrect" });
	}
	// Fetch user's profile
	let data2;
	try {
		data2 = (
			await axios.post(process.env.ROUTE_URL + "/profile/retrieve", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: { query: { _id: input.profileId } },
			})
		)["data"];
	} catch (error) {
		data2 = { status: "error", content: error };
	}
	const profile = data2.content[0];
	// Check if the user is already part of the group
	for (let i = 0; i < profile.licenses.length; i++) {
		const licenseId = profile.licenses[i];
		let id;
		// Group active licenses
		id = group.licenses.active.find((license) => license.toString() === licenseId.toString());
		if (id) return res.send({ status: "failed", content: "already joined" });
		// Group queue licenses
		id = group.licenses.queue.find((license) => license.toString() === licenseId.toString());
		if (id) return res.send({ status: "failed", content: "already joined" });
	}
	// Add the user to the group
	let data3;
	try {
		data3 = (
			await axios.post(process.env.ROUTE_URL + "/group/add-member", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: {
					group: group._id,
					profile: profile._id,
					role: "student",
					date: input.date,
					status: "activated",
				},
			})
		)["data"];
	} catch (error) {
		data3 = { status: "error", content: error };
	}
	if (data3.status !== "succeeded") return res.send({ status: "error" });
	// Construct the output
	const data = {
		status: "succeeded",
		content: {
			id: group._id,
			number: group.number,
			name: group.name,
			role: "student",
			numOfUsers: {
				admins: group.licenses.active.filter((license) => license.role === "admin").length,
				teachers: group.licenses.active.filter((license) => license.role === "teacher").length,
				students: group.licenses.active.filter((license) => license.role === "student").length,
			},
			type: "school",
		},
	};
	// Success handler
	return res.send(data);
}

// HELPER ===================================================

// END  =====================================================
