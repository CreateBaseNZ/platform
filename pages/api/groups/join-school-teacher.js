// TODO: Integration - Review
// IMPORT ===================================================

import axios from "axios";

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error" });
	}
	const input = req.body.input;
	// Integration Logic
	// Fetch the group that the user is attempting to join in
	let data1;
	try {
		data1 = (
			await axios.post(process.env.ROUTE_URL + "/group/retrieve", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: { query: { _id: input.schoolId }, option: {} },
			})
		)["data"];
	} catch (error) {
		data1 = { status: "error", content: error };
	}
	if (data1.status !== "succeeded") return res.send({ status: "error" });
	const group = data1.content[0];
	// Fetch the profile of the user
	let data2;
	try {
		data2 = (
			await axios.post(process.env.ROUTE_URL + "/profile/retrieve", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
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
		id = group.licenses.active.find((license) => license.toString() === licenseId.toString());
		if (id) return res.send({ status: "failed", content: "already joined" });
		// Group queue licenses
		id = group.licenses.queue.find((license) => license.toString() === licenseId.toString());
		if (id) return res.send({ status: "failed", content: "already requested" });
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
					role: "teacher",
					date: input.date,
					status: "requested",
					requestMessage: input.message,
				},
			})
		)["data"];
	} catch (error) {
		data3 = { status: "error", content: error };
	}
	if (data3.status !== "succeeded") return res.send({ status: "error" });
	// Update the alias of the teacher
	let data4;
	try {
		data4 = (
			await axios.post(process.env.ROUTE_URL + "/license/update", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: {
					query: { _id: data3.content.license._id },
					updates: [{ type: "metadata", update: { alias: input.alias } }],
					date: input.date,
				},
			})
		)["data"];
	} catch (error) {
		data4 = { status: "error", content: error };
	}
	if (data4.status !== "succeeded") return res.send({ status: "error" });
	// no failure modes here
	const content = {
		licenseId: data3.content.license._id,
		id: data3.content.group._id,
		number: data3.content.group.number,
		name: data3.content.group.name,
		role: data3.content.license.role,
		type: data3.content.group.type,
		numOfUsers: {
			admins: group.licenses.active.filter((license) => license.role === "admin").length,
			teachers: group.licenses.active.filter((license) => license.role === "teacher").length,
			students: group.licenses.active.filter((license) => license.role === "student").length,
		},
		verified: data3.content.group.verified,
		status: data3.content.license.status,
		alias: input.alias,
	};
	return res.send({ status: "succeeded", content });
}

// HELPERS ==================================================

// END ======================================================
