// TODO: Integration - Backend

// IMPORT ===================================================

import axios from "axios";

// TEST OUTPUT ==============================================

const DUMMY_NOTIFICATIONS = [
	{
		id: "notificationIdabc123",
		type: "class-request",
		params: {
			class: { id: "classIdabc123", name: "Gummy 101" },
			group: { id: "groupIdabc123", name: "CreateBase Academy" },
			user: { accountId: "useraccountIdabc123", profileId: "profileIdabc123", licenseId: "licenseIdabc123", firstName: "Felix", lastName: "Lengyel", email: "fl@gmail.com" },
		},
	},
	{
		id: "notificationIdabc987",
		type: "group-request",
		params: {
			group: { id: "groupIdabc987", name: "CreateBase University" },
			user: { accountId: "useraccountIdabc123", profileId: "profileIdabc123", licenseId: "licenseIdabc123", firstName: "Felix", lastName: "Lengyel", email: "fl@gmail.com" },
		},
	},
];

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
	// 		content: DUMMY_NOTIFICATIONS,
	// 	};
	// }
	// Integration Logic
	// Fetch the user's profile document
	let data1;
	try {
		data1 = (
			await axios.post(process.env.ROUTE_URL + "/profile/retrieve", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: { query: { _id: input.profileId }, option: {} },
			})
		)["data"];
	} catch (error) {
		data1 = { status: "error", content: error };
	}
	if (data1.status !== "succeeded") return res.send({ status: "error" });
	// Fetch the licenses associated with the profile
	let data2;
	try {
		data2 = (
			await axios.post(process.env.ROUTE_URL + "/license/retrieve", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: { query: { _id: data1.content[0].licenses }, option: {} },
			})
		)["data"];
	} catch (error) {
		data2 = { status: "error", content: error };
	}
	if (data2.status !== "succeeded") return res.send({ status: "error" });
	// For each license, fetch the associated group
	let groupIds = [];
	for (let i = 0; i < data2.content.length; i++) {
		const license = data2.content[i];
		if (license.role === "admin" || license.role === "teacher") {
			groupIds.push(license.group);
		}
	}
	let data3;
	try {
		data3 = (
			await axios.post(process.env.ROUTE_URL + "/group/retrieve", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: { query: { _id: groupIds }, option: { class: [] } },
			})
		)["data"];
	} catch (error) {
		data3 = { status: "error", content: error };
	}
	if (data3.status !== "succeeded") return res.send({ status: "error" });
	// Filter groups where the use is an admin
	const groupsAdmin = data3.content.filter((group) => {});
	// Retrieve the classes where the user is a teacher
	let classes = [];
	for (let j = 0; j < data3.content.length; j++) {
		const group = data3.content[j];
		// Get the user's license associated with this group
		// Get the classes associated with the license
		classes = classes.concat(group.classes.filter((instance) => {}));
	}
	return res.send(data);
}

// HELPERS ==================================================

// END ======================================================
