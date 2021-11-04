// TODO: Integration - Integrated
// TODO decide how to handle already joined school
// IMPORT ===================================================

import axios from "axios";

// TEST OUTPUT ==============================================

const DUMMY_ALL_SCHOOLS = [
	{ id: "bdsc", name: "Botany Downs Secondary School", role: "teacher", numOfUsers: { admins: 1, teachers: 3, students: 78 }, type: "school", address: { city: "Auckland", country: "New Zealand" } },
	{ id: "rc", name: "Rosehill College", role: "admin", numOfUsers: { admins: 2, teachers: 2, students: 64 }, type: "school", address: { city: "Auckland", country: "New Zealand" } },
	{ id: "spp", name: "Shelly Park Primary", role: "student", numOfUsers: { admins: 1, teachers: 1, students: 34 }, type: "school", address: { city: "Auckland", country: "New Zealand" } },
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
	// 		content: getQueriedGroups(req.body.input.query),
	// 	};
	// }
	// Integration Logic
	let data;
	try {
		data = (await axios.post(process.env.ROUTE_URL + "/group/retrieve", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input: { query: {}, option: { license: ["role"] } } }))["data"];
	} catch (error) {
		data = { status: "error", content: error };
	}
	let groups = getQueriedGroups(input.query, data.content);
	for (let i = 0; i < groups.length; i++) {
		const group = groups[i];
		groups[i] = {
			id: data3.content.group._id,
			number: data3.content.group.number,
			name: data3.content.group.name,
			type: data3.content.group.type,
			numOfUsers: {
				admins: group.licenses.active.filter((license) => license.role === "admin").length,
				teachers: group.licenses.active.filter((license) => license.role === "teacher").length,
				students: group.licenses.active.filter((license) => license.role === "student").length,
			},
			verified: data3.content.group.verified,
		};
	}
	return res.send({ status: "succeeded", content: groups });
}

// HELPERS ==================================================

const getQueriedGroups = (query, groups) => {
	return groups.filter((group) => group.name.toLowerCase().includes(query.toLowerCase()));
};

// END ======================================================
