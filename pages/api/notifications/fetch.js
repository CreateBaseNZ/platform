// TODO: Integration - Review

// IMPORT ===================================================

import axios from "axios";
import randomize from "randomatic";

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
	let notifications = [];
	// Fetch the groups associated with this user
	const groupIds = input.groups.map((group) => group.id);
	if (!groupIds.length) return res.send({ status: "succeeded", content: notifications });
	let data1;
	try {
		data1 = (
			await axios.post(process.env.ROUTE_URL + "/group/retrieve", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: { query: { _id: groupIds }, option: { class: [] } },
			})
		)["data"];
	} catch (error) {
		data1 = { status: "error", content: error };
	}
	if (data1.status !== "succeeded") return res.send({ status: "error" });
	// Create an array of licenses to fetch
	let licenseIds = [];
	for (let i = 0; i < data1.content.length; i++) {
		const group = data1.content[i];
		// Check if the user is an admin of this group
		if (
			input.groups.find((inputGroup) => {
				return inputGroup.id.toString() === group._id.toString() && inputGroup.role === "admin";
			})
		) {
			licenseIds = licenseIds.concat(group.licenses.queue);
		}
		for (let j = 0; j < group.classes.length; j++) {
			const instance = group.classes[j];
			licenseIds = licenseIds.concat(instance.licenses.requested);
		}
	}
	// Remove duplicates of license IDs
	licenseIds = [...new Set(licenseIds)];
	if (!licenseIds.length) return res.send({ status: "succeeded", content: notifications });
	// Fetch the licenses of interest and retrieve their profile and profile
	let data2;
	try {
		data2 = (
			await axios.post(process.env.ROUTE_URL + "/license/retrieve", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: { query: { _id: licenseIds }, option: { profile: [], account: [] } },
			})
		)["data"];
	} catch (error) {
		data2 = { status: "error", content: error };
	}
	if (data2.status !== "succeeded") return res.send({ status: "error" });
	// Build the notification array
	notifications = groupRequestNotifications(data1.content, data2.content, input.groups);
	// Success handler
	return res.send({ status: "succeeded", content: notifications });
}

// HELPERS ==================================================

function groupRequestNotifications(groups, licenses, inputGroups) {
	let notifications = [];
	for (let i = 0; i < groups.length; i++) {
		const group = groups[i];
		notifications = notifications.concat(classRequestNotifications(group, licenses, inputGroups));
		// If the user is an admin
		if (
			inputGroups.find((inputGroup) => {
				return inputGroup.id.toString() === group._id.toString() && inputGroup.role === "admin";
			})
		) {
			for (let j = 0; j < group.licenses.queue.length; j++) {
				const licenseId = group.licenses.queue[j];
				const license = licenses.find((document) => document._id.toString() === licenseId.toString());
				if (license.status === "requested") {
					const notification = {
						id: randomize("Aa0", 12),
						type: "group-request",
						params: {
							group: { id: group._id, name: group.name },
							user: {
								accountId: license.profile.account._id,
								profileId: license.profile._id,
								licenseId: license._id,
								firstName: license.profile.name.first,
								lastName: license.profile.name.last,
								email: license.profile.account.email,
							},
							message: license.metadata.requestMessage,
						},
					};
					notifications.push(notification);
				}
			}
		} else if (
			inputGroups.find((inputGroup) => {
				return inputGroup.id.toString() === group._id.toString() && inputGroup.status === "invited";
			})
		) {
			const element = inputGroups.find((inputGroup) => {
				return inputGroup.id.toString() === group._id.toString() && inputGroup.status === "invited";
			});
			const license = licenses.find((document) => document._id.toString() === element.licenseId.toString());
			const notification = {
				id: randomize("Aa0", 12),
				type: "group-invite",
				params: {
					group: { id: group._id, name: group.name },
					user: {
						accountId: license.profile.account._id,
						profileId: license.profile._id,
						licenseId: license._id,
						firstName: license.profile.name.first,
						lastName: license.profile.name.last,
						email: license.profile.account.email,
					},
					message: license.metadata.inviteMessage,
				},
			};
			notifications.push(notification);
		}
	}
	return notifications;
}

function classRequestNotifications(group, licenses, inputGroups) {
	let notifications = [];
	for (let i = 0; i < group.classes.length; i++) {
		const instance = group.classes[i];
		if (
			inputGroups.find((inputGroup) => {
				return instance.licenses.active.find((id) => id.toString() === inputGroup.licenseId.toString());
			})
		) {
			for (let j = 0; j < instance.licenses.requested.length; j++) {
				const licenseId = instance.licenses.requested[j];
				const license = licenses.find((document) => document._id.toString() === licenseId.toString());
				const notification = {
					id: randomize("Aa0", 12),
					type: "class-request",
					params: {
						class: { id: instance._id, name: instance.name },
						group: { id: group._id, name: group.name },
						user: {
							accountId: license.profile.account._id,
							profileId: license.profile._id,
							licenseId: license._id,
							firstName: license.profile.name.first,
							lastName: license.profile.name.last,
							email: license.profile.account.email,
						},
						message: "",
					},
				};
				notifications.push(notification);
			}
		}
	}
	return notifications;
}

// END ======================================================
