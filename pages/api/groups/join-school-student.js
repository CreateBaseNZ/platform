// TODO: Integration - Review
// IMPORT ===================================================

import axios from "axios";

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	if (req.body.API_KEY_PUBLIC !== process.env.API_KEY_PUBLIC) {
		return res.send({ status: "critical error" });
	}
	const input = req.body.input;
	let data1;
	try {
		data1 = (
			await axios.post(process.env.PREFIX_BACKEND + "/group/retrieve-by-code", {
				API_KEY_PRIVATE: process.env.API_KEY_PRIVATE,
				input: { role: "school-student", code: input.code, option: { license: [] } },
			})
		)["data"];
	} catch (error) {
		data1 = { status: "error", content: error };
	}
	// Check if a group with the specified student code exist
	if (data1.status !== "succeeded") {
		if (data1.status === "failed" && data1.content.group) {
			return res.send({ status: "failed", content: "incorrect" });
		} else {
			return res.send({ status: "error" });
		}
	}
	const group = data1.content;
	// Fetch user's profile
	let data2;
	try {
		data2 = (
			await axios.post(process.env.PREFIX_BACKEND + "/profile/retrieve", {
				API_KEY_PRIVATE: process.env.API_KEY_PRIVATE,
				input: { query: { _id: input.profileId }, option: {} },
			})
		)["data"];
	} catch (error) {
		data2 = { status: "error", content: error };
	}
	if (data2.status !== "succeeded") return res.send({ status: "error" });
	const profile = data2.content[0];
	// Check if the user is already part of the group
	for (let i = 0; i < profile.licenses.length; i++) {
		const licenseId = profile.licenses[i];
		let id;
		// Group active licenses
		id = group.licenses.active.find((license) => license._id.toString() === licenseId.toString());
		if (id) return res.send({ status: "failed", content: "already joined" });
		// Group queue licenses
		id = group.licenses.queue.find((license) => license._id.toString() === licenseId.toString());
		if (id) return res.send({ status: "failed", content: "already joined" });
	}
	// Add the user to the group
	let data3;
	try {
		data3 = (
			await axios.post(process.env.PREFIX_BACKEND + "/group/add-member", {
				API_KEY_PRIVATE: process.env.API_KEY_PRIVATE,
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
			licenseId: data3.content.license._id,
			id: data3.content.group._id,
			number: data3.content.group.number,
			name: data3.content.group.name,
			role: data3.content.license.role,
			type: data3.content.group.type,
			numOfUsers: {
				admins: group.licenses.active.filter((license) => license.role === "admin").length,
				teachers: group.licenses.active.filter((license) => license.role === "teacher").length,
				students: group.licenses.active.filter((license) => license.role === "student").length + 1,
			},
			verified: data3.content.group.verified,
			status: data3.content.license.status,
		},
	};
	// Success handler
	return res.send(data);
}

// HELPER ===================================================

// END  =====================================================
