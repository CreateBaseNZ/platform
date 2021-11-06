// TODO: Integration - Review

// IMPORT ===================================================

import axios from "axios";

// OUTPUT ===================================================

const DUMMY_SENT = {
	sent: true,
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
	// 		content: DUMMY_SENT, // does not require content
	// 	};
	// }
	// Integration Logic
	// Register a school
	let data1;
	try {
		data1 = (
			await axios.post(process.env.ROUTE_URL + "/group/school/register", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: {
					name: input.name,
					location: {
						address: input.address,
						city: input.city,
						country: input.country,
					},
					date: input.date,
				},
			})
		)["data"];
	} catch (error) {
		data1 = { status: "error", content: error };
	}
	if (data1.status === "error") return res.send(data1);
	const group = data1.content;
	// Add the admin
	let data2;
	try {
		data2 = (
			await axios.post(process.env.ROUTE_URL + "/group/add-member", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: {
					group: group._id,
					profile: input.profileId,
					role: "admin",
					status: "activated",
					date: input.date,
				},
			})
		)["data"];
	} catch (error) {
		data2 = { status: "error", content: error };
	}
	if (data2.status !== "succeeded") return res.send({ status: "error" });
	// Update the alias of the teacher
	let data3;
	try {
		data3 = (
			await axios.post(process.env.ROUTE_URL + "/license/update", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: {
					query: { _id: data2.content.license._id },
					updates: [{ type: "metadata", update: { alias: input.alias } }],
					date: input.date,
				},
			})
		)["data"];
	} catch (error) {
		data3 = { status: "error", content: error };
	}
	if (data3.status !== "succeeded") return res.send({ status: "error" });
	// Success handler
	const data = {
		status: "succeeded",
		content: {
			licenseId: data2.content.license._id,
			id: data2.content.group._id,
			number: data2.content.group.number,
			name: data2.content.group.name,
			role: data2.content.license.role,
			type: data2.content.group.type,
			numOfUsers: { admins: 1, teachers: 0, students: 0 },
			verified: data2.content.group.verified,
			status: data2.content.license.status,
			alias: input.alias,
		},
	};
	return res.send(data);
}

// HELPER ===================================================

// END  =====================================================
