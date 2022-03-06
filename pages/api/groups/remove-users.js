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
	// Integration Logic
	// Check privileges
	let check;
	try {
		check = await checkPrivileges([input.licenseId, ...input.licenseIds], input.groupId, input.role);
	} catch (error) {
		return res.send(error);
	}
	if (!check.access) return res.send({ status: "error", content: "invalid privileges" });
	for (let i = 0; i < input.licenseIds.length; i++) {
		const licenseId = input.licenseIds[i];
		// Fetch the profile associated with this license
		let data1;
		try {
			data1 = (
				await axios.post(process.env.PREFIX_BACKEND + "/license/retrieve", {
					API_KEY_PRIVATE: process.env.API_KEY_PRIVATE,
					input: { query: { _id: licenseId }, option: { profile: [] } },
				})
			)["data"];
		} catch (error) {
			data1 = { status: "error", content: error };
		}
		if (data1.status !== "succeeded") return res.send({ status: "error" });
		// Update the recentGroups saves
		const index = data1.content[0].profile.licenses.indexOf(licenseId);
		data1.content[0].profile.saves.recentGroups = data1.content[0].profile.saves.recentGroups.filter((element) => element !== index);
		data1.content[0].profile.saves.recentGroups = data1.content[0].profile.saves.recentGroups.map((element) => {
			if (element > index) {
				return element - 1;
			} else {
				return element;
			}
		});
		let data2;
		try {
			data2 = (
				await axios.post(process.env.PREFIX_BACKEND + "/profile/update", {
					API_KEY_PRIVATE: process.env.API_KEY_PRIVATE,
					input: {
						query: { _id: data1.content[0].profile._id },
						updates: [{ type: "saves", update: { recentGroups: data1.content[0].profile.saves.recentGroups } }],
						date: input.date,
					},
				})
			)["data"];
		} catch (error) {
			data2 = { status: "error", content: error };
		}
		if (data2.status !== "succeeded") return res.send({ status: "error" });
		// Remove the user
		let data3;
		try {
			data3 = (
				await axios.post(process.env.PREFIX_BACKEND + "/group/remove-member", {
					API_KEY_PRIVATE: process.env.API_KEY_PRIVATE,
					input: {
						query: { group: { _id: input.groupId }, license: { _id: licenseId, group: input.groupId } },
						date: input.date,
					},
				})
			)["data"];
		} catch (error) {
			data3 = { status: "error", content: error };
		}
		if (data3.status !== "succeeded") return res.send({ status: "error" });
	}
	return res.send({ status: "succeeded" });
}

// HELPERS ==================================================

async function checkPrivileges(licenseIds, groupId, role) {
	let valid;
	// Check group privileges
	try {
		valid = await checkGroupPrivileges(licenseIds, groupId, role);
	} catch (error) {
		throw error;
	}
	if (!valid) return { access: false, reason: "invalid group privileges" };
	// Success handler
	return { access: true };
}

async function checkGroupPrivileges(licenseIds, groupId, role) {
	// Check if all the licenses are active members of the group
	const keys = { API_KEY_PRIVATE: process.env.API_KEY_PRIVATE };
	const url = process.env.PREFIX_BACKEND + "/group/check-privileges";
	const input = { query: { group: { _id: groupId }, license: { _id: licenseIds } }, licenseIds };
	// Send request to the backend
	let data;
	try {
		data = (await axios.post(url, { ...keys, input }))["data"];
	} catch (error) {
		data = { status: "error", content: error };
	}
	if (data.status !== "succeeded") throw data;
	// Check if all the license of interest are part of the group
	const requestorCheck = data.content.shift();
	if (role === "student") {
		if (!requestorCheck.privilege.member.active || !(requestorCheck.privilege.admin || requestorCheck.privilege.teacher)) return false;
	} else if (role === "teacher") {
		if (!requestorCheck.privilege.member.active || !requestorCheck.privilege.admin) return false;
	}
	for (let i = 0; i < data.content.length; i++) {
		const check = data.content[i];
		if (!check.privilege.member.active) return false;
		if (check.privilege.member.queue) return false;
		if (check.privilege.member.inactive) return false;
		if (role === "student") {
			if (!check.privilege.student) return false;
		} else if (role === "teacher") {
			if (!check.privilege.teacher) return false;
		}
	}
	// Success handler
	return true;
}

// END ======================================================
