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
	// Register a school
	let data1;
	try {
		data1 = (
			await axios.post(process.env.ROUTE_URL + "/group/school/register", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: {
					name: input.name,
					location: {
						address: input.address,
						city: input.city,
						country: input.country,
					},
					date: input.date,
				},
			})
		)["data"];
	} catch (error) {
		data1 = { status: "error", content: error };
	}
	if (data1.status === "error") return res.send(data1);
	const group = data1.content;
	// Add the admin
	let data2;
	try {
		data2 = (
			await axios.post(process.env.ROUTE_URL + "/group/add-member", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: {
					group: group._id,
					profile: input.profileId,
					role: "admin",
					status: "activated",
					date: input.date,
				},
			})
		)["data"];
	} catch (error) {
		data2 = { status: "error", content: error };
	}
	if (data2.status !== "succeeded") return res.send({ status: "error" });
	// Update the alias of the teacher
	try {
		await updateAlias(data2.content.license, input.alias, input.date);
	} catch (error) {
		return res.send(error);
	}
	// Send the success email
	try {
		await sendEmail(data2.content.profile, group.name);
	} catch (error) {
		return res.send(error);
	}
	// Send email notification to the team
	try {
		await notifyTeam(data2.content.profile, group);
	} catch (error) {
		return res.send(error);
	}
	// Success handler
	const data = {
		status: "succeeded",
		content: {
			licenseId: data2.content.license._id,
			id: data2.content.group._id,
			number: data2.content.group.number,
			name: data2.content.group.name,
			role: data2.content.license.role,
			type: data2.content.group.type,
			numOfUsers: { admins: 1, teachers: 0, students: 0 },
			verified: data2.content.group.verified,
			status: data2.content.license.status,
			alias: input.alias,
		},
	};
	return res.send(data);
}

// HELPER ===================================================

function updateAlias(license, alias, date) {
	return new Promise(async (resolve, reject) => {
		// Construct the input object
		const input = { query: { _id: license._id }, updates: [{ type: "metadata", update: { alias } }], date };
		// Send the processing request
		let data;
		try {
			data = (await axios.post(process.env.ROUTE_URL + "/license/update", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input }))["data"];
		} catch (error) {
			data = { status: "error", content: error };
		}
		// Error handler
		if (data.status !== "succeeded") return reject({ status: "error" });
		// Success handler
		return resolve();
	});
}

function sendEmail(profile, groupName) {
	return new Promise(async (resolve, reject) => {
		// Construct the input object
		const input = {
			accountId: profile.account.local,
			option: { name: profile.name.first, receive: "organisation-created", notification: "onboarding", tone: "friendly", group: groupName },
		};
		// Send the processing request
		let data;
		try {
			data = (await axios.post(process.env.ROUTE_URL + "/mail/send-email", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input }))["data"];
		} catch (error) {
			data = { status: "error", content: error };
		}
		// Error handler
		if (data.status !== "succeeded") return reject({ status: "error" });
		// Success handler
		return resolve();
	});
}

function notifyTeam(profile, group) {
	return new Promise(async (resolve, reject) => {
		// Construct the input object
		const input = {
			option: {
				recipient: "team",
				name: "Team",
				receive: "new-org-notif",
				notification: "createbase",
				tone: "friendly",
				orgName: group.name,
				orgLocation: `${group.location.city}, ${group.location.country}`,
				userName: profile.name.first,
			},
		};
		// Send the processing request
		let data;
		try {
			data = (await axios.post(process.env.ROUTE_URL + "/mail/send-email", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input }))["data"];
		} catch (error) {
			data = { status: "error", content: error };
		}
		// Error handler
		if (data.status !== "succeeded") return reject({ status: "error" });
		// Success handler
		return resolve();
	});
}

// END  =====================================================
