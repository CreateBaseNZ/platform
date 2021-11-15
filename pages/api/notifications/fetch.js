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
	// Test Logic
	let data;
	if (req.body.status === "succeeded") {
		data = {
			status: "succeeded",
			content: DUMMY_NOTIFICATIONS,
		};
	}
	return res.send(data);
}

// HELPERS ==================================================

// END ======================================================
