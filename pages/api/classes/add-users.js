// TODO: Integration - Test

// IMPORT ===================================================

import axios from "axios";

// TEST OUTPUT ==============================================

const DUMMY_UPDATED_USERS_LIST = {
	teachers: ["asdfsdf", "asdfsdf"],
	students: [
		{ accountId: "abc123", firstName: "asd", lastName: "asfsdf" },
		{ accountId: "gh", firstName: "asdf", lastName: "df" },
		{ accountId: "asdf", firstName: "ssa", lastName: "sdf" },
	],
};

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error" });
	}
	const input = req.body.input;
	// Integration Logic
	// Check privileges
	let check;
	try {
		check = await checkPrivileges([input.licenseId, ...input.licenseIds], input.groupId, input.classId);
	} catch (error) {
		return res.send(error);
	}
	if (!check.access) return res.send({ status: "error", content: "invalid privileges" });
	// Add each user
	for (let i = 0; i < input.licenseIds.length; i++) {
		const licenseId = input.licenseIds[i];
		console.log(licenseId);
		let data;
		try {
			data = (
				await axios.post(process.env.ROUTE_URL + "/class/add-member", {
					PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
					input: { class: input.classId, license: licenseId, date: input.date, status: "activated" },
				})
			)["data"];
		} catch (error) {
			data = { status: "error", content: error };
		}
		console.log(data);
		if (data.status !== "succeeded") return res.send({ status: "error" });
	}
	return res.send({ status: "succeeded" });
}

// HELPERS ==================================================

async function checkPrivileges(licenseIds, groupId, classId) {
	let valid;
	// Check group privileges
	try {
		valid = await checkGroupPrivileges(licenseIds, groupId);
	} catch (error) {
		throw error;
	}
	if (!valid) return { access: false, reason: "invalid group privileges" };
	// Check class privileges
	try {
		valid = await checkClassPrivileges(licenseIds, classId);
	} catch (error) {
		throw error;
	}
	if (!valid) return { access: false, reason: "invalid class privileges" };
	// Success handler
	return { access: true };
}

async function checkGroupPrivileges(licenseIds, groupId) {
	// Check if all the licenses are active members of the group
	const keys = { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY };
	const url = process.env.ROUTE_URL + "/group/check-privileges";
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
	for (let i = 0; i < data.content.length; i++) {
		const check = data.content[i];
		if (!check.privilege.member.active) return false;
	}
	// Success handler
	return true;
}

async function checkClassPrivileges(licenseIds, classId) {
	// Check if all the licenses are active members of the group
	const keys = { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY };
	const url = process.env.ROUTE_URL + "/class/check-privileges";
	const input = { query: { class: { _id: classId }, license: { _id: licenseIds } }, licenseIds };
	// Send request to the backend
	let data;
	try {
		data = (await axios.post(url, { ...keys, input }))["data"];
	} catch (error) {
		data = { status: "error", content: error };
	}
	if (data.status !== "succeeded") throw data;
	// Check if the requestor has a teacher access
	const requestorCheck = data.content.shift();
	if (!requestorCheck.privilege.member.active || !requestorCheck.privilege.teacher) return false;
	// Check if the users who are being added are currently not a member
	for (let i = 0; i < data.content.length; i++) {
		const check = data.content[i];
		if (check.privilege.member.active) return false;
		if (check.privilege.member.requested) return false;
		if (check.privilege.member.invited) return false;
	}
	// Success handler
	return true;
}

// END ======================================================
