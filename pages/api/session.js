// TODO: Integration - Documentation complete
// IMPORT ===================================================

import axios from "axios";
import { getSession } from "next-auth/react";

// TEST OUTPUT ==============================================

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error" });
	}
	const session = await getSession({ req });
	console.log(session);
	const input = { ...req.body.input, email: session.user.email };
	console.log(input);
	// // Test Logic
	// let data;
	// if (req.body.status === "succeeded") {
	// 	data = {
	// 		status: "succeeded",
	// 		content: DUMMY_SESSION,
	// 	};
	// }
	// Integration Logic
	let data;
	try {
		data = (
			await axios.post(process.env.ROUTE_URL + "/session", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: {
					email: input.email,
					date: input.date,
					properties: input.properties,
				},
			})
		)["data"];
	} catch (error) {
		data = { status: "error", content: error };
	}
	if (data.status === "failed" && data.content.account === "does not exist") {
		return res.send({ status: "failed", content: "invalid account id" });
	}
	if (data.content.recentGroups) {
		if (data.content.recentGroups.length) {
			data.content.recentGroups = recentGroupsCheck(data.content.recentGroups, data.content.groups);
		}
	}
	if (data.status !== "succeeded") return res.send({ status: "error" });
	return res.send({ status: "succeeded", content: data.content });
}

// HELPERS ==================================================

function recentGroupsCheck(recentGroups, groups) {
	let valid = true;
	for (let i = 0; i < recentGroups.length; i++) {
		if (!groups[recentGroups[i]]) {
			valid = false;
		} else {
			if (!groups[recentGroups[i]].verified) valid = false;
		}
	}
	if (!valid) {
		return [];
	} else {
		return recentGroups;
	}
}

// END ======================================================
