// TODO: Integration - Review

// IMPORT ===================================================

import axios from "axios";

// TEST OUTPUT ==============================================

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
		check = await checkPrivileges([input.licenseId, ...input.licenseIds], input.groupId);
	} catch (error) {
		return res.send(error);
	}
	if (!check.access) return res.send({ status: "error", content: "invalid privileges" });
	for (let i = 0; i < input.licenseIds.length; i++) {
		const licenseId = input.licenseIds[i];
		let data;
		try {
			data = (
				await axios.post(process.env.PREFIX_BACKEND + "/license/update", {
					API_KEY_PRIVATE: process.env.API_KEY_PRIVATE,
					input: {
						query: { _id: licenseId, group: input.groupId },
						updates: [{ type: "role", update: "admin" }],
						date: input.date,
					},
				})
			)["data"];
		} catch (error) {
			data = { status: "error", content: error };
		}
		if (data.status !== "succeeded") return res.send({ status: "error" });
	}
	return res.send({ status: "succeeded" });
}

// HELPERS ==================================================

async function checkPrivileges(licenseIds, groupId) {
	let valid;
	// Check group privileges
	try {
		valid = await checkGroupPrivileges(licenseIds, groupId);
	} catch (error) {
		throw error;
	}
	if (!valid) return { access: false, reason: "invalid group privileges" };
	// Success handler
	return { access: true };
}

async function checkGroupPrivileges(licenseIds, groupId) {
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
	if (!requestorCheck.privilege.member.active || !requestorCheck.privilege.admin) return false;
	for (let i = 0; i < data.content.length; i++) {
		const check = data.content[i];
		if (!check.privilege.member.active) return false;
		if (check.privilege.member.queue) return false;
		if (check.privilege.member.inactive) return false;
		if (check.privilege.student) return false;
		if (!check.privilege.teacher) return false;
	}
	// Success handler
	return true;
}

// END ======================================================
