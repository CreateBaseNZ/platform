// TODO: Integration - Review

// IMPORT ===================================================

import axios from "axios";

// TEST OUTPUT ==============================================

const DUMMY_OUTPUT = {};

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	if (req.body.API_KEY_PUBLIC !== process.env.API_KEY_PUBLIC) {
		return res.send({ status: "critical error" });
	}
	const input = req.body.input;
	// Integration Logic
	// Fetch the class of interest
	let instance;
	try {
		instance = await fetchClass(input.classId);
	} catch (error) {
		return res.send(error);
	}
	if (!instance) return res.send({ status: "error", content: "class does not exist" });
	// Check privileges
	let check;
	try {
		check = await checkPrivileges([input.licenseId], instance.group, instance._id);
	} catch (error) {
		return res.send(error);
	}
	if (!check.access) return res.send({ status: "error", content: "invalid privileges" });
	// Accept the member
	let data;
	try {
		data = (
			await axios.post(process.env.PREFIX_BACKEND + "/class/accept-member", {
				API_KEY_PRIVATE: process.env.API_KEY_PRIVATE,
				input: { query: { _id: instance._id }, license: input.licenseId },
			})
		)["data"];
	} catch (error) {
		data = { status: "error", content: error };
	}
	if (data.status !== "succeeded") return res.send({ status: "error" });
	return res.send(data);
}

// HELPERS ==================================================

async function fetchClass(classId) {
	const keys = { API_KEY_PRIVATE: process.env.API_KEY_PRIVATE };
	const url = process.env.PREFIX_BACKEND + "/class/retrieve";
	const input = { query: { _id: classId }, option: {} };
	// Send request to the backend
	let data;
	try {
		data = (await axios.post(url, { ...keys, input }))["data"];
	} catch (error) {
		data = { status: "error", content: error };
	}
	if (data.status !== "succeeded") throw data;
	// Success handler
	return data.content[0];
}

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
	for (let i = 0; i < data.content.length; i++) {
		const check = data.content[i];
		if (!check.privilege.member.active) return false;
	}
	// Success handler
	return true;
}

async function checkClassPrivileges(licenseIds, classId) {
	// Check if all the licenses are active members of the group
	const keys = { API_KEY_PRIVATE: process.env.API_KEY_PRIVATE };
	const url = process.env.PREFIX_BACKEND + "/class/check-privileges";
	const input = { query: { class: { _id: classId }, license: { _id: licenseIds } }, licenseIds };
	// Send request to the backend
	let data;
	try {
		data = (await axios.post(url, { ...keys, input }))["data"];
	} catch (error) {
		data = { status: "error", content: error };
	}
	if (data.status !== "succeeded") throw data;
	// Check if the users who are being added are currently not a member and has requested to join
	const check = data.content[0];
	if (check.privilege.member.active) return false;
	if (!check.privilege.member.requested) return false;
	if (check.privilege.member.invited) return false;
	// Success handler
	return true;
}

// END ======================================================
