// TODO: Integration - Test

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
	// Fetch the group
	let data1;
	try {
		data1 = (
			await axios.post(process.env.ROUTE_URL + "/group/retrieve", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: {
					query: { _id: input.groupId },
					option: { license: [], profile: [], account: [] },
				},
			})
		)["data"];
	} catch (error) {
		data1 = { status: "error", content: error };
	}
	if (data1.status !== "succeeded") return res.send({ status: "error" });
	// Fetch the class of interest
	let data2;
	try {
		data2 = (
			await axios.post(process.env.ROUTE_URL + "/class/retrieve", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: { query: { _id: input.classId }, option: {} },
			})
		)["data"];
	} catch (error) {
		data2 = { status: "error", content: error };
	}
	if (data2.status !== "succeeded") return res.send({ status: "error" });
	// Construct the user
	const users = constructUsers(data1.content[0], data2.content[0]);
	// TODO: Check the privileges
	return res.send({ status: "succeeded", content: users });
}

// HELPERS ==================================================

const constructUsers = (group, instance) => {
	let licenses = [];
	for (let i = 0; i < group.licenses.active.length; i++) {
		const license = group.licenses.active[i];
		let status;
		if (instance.licenses.active.find((licenseId) => licenseId.toString() === license._id.toString())) {
			status = "joined";
		} else if (instance.licenses.requested.find((licenseId) => licenseId.toString() === license._id.toString())) {
			status = "requested";
		} else if (instance.licenses.invited.find((licenseId) => licenseId.toString() === license._id.toString())) {
			status = "invited";
		} else {
			status = "";
		}
		licenses.push({
			profileId: license.profile._id,
			licenseId: license._id,
			firstName: license.profile.name.first,
			lastName: license.profile.name.last,
			role: license.role,
			status,
			email: license.profile.account.email,
			alias: license.metadata.alias,
		});
	}
	return licenses;
};

// END ======================================================
