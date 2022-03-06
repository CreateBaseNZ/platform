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
	// Check privileges
	let check;
	try {
		check = await checkPrivileges([input.licenseId], input.groupId);
	} catch (error) {
		return res.send(error);
	}
	if (!check.access) return res.send({ status: "error", content: "invalid privileges" });
	let data;
	try {
		data = (
			await axios.post(process.env.PREFIX_BACKEND + "/group/accept-member", {
				API_KEY_PRIVATE: process.env.API_KEY_PRIVATE,
				input: { query: { group: { _id: input.groupId }, license: { _id: input.licenseId } }, date: input.date },
			})
		)["data"];
	} catch (error) {
		data = { status: "error", content: error };
	}
	if (data.status !== "succeeded") return res.send({ status: "error" });
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
	const check = data.content[0];
	if (check.privilege.member.active) return false;
	if (!check.privilege.member.queue) return false;
	if (check.privilege.member.inactive) return false;
	// Success handler
	return true;
}

// END ======================================================
