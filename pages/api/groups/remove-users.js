// TODO: Integration - Review

// IMPORT ===================================================

import axios from "axios";

// TEST OUTPUT ==============================================

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error" });
	}
	const input = req.body.input;
	// Integration Logic
	for (let i = 0; i < input.licenseIds.length; i++) {
		const licenseId = input.licenseIds[i];
		// Fetch the profile associated with this license
		let data1;
		try {
			data1 = (
				await axios.post(process.env.ROUTE_URL + "/license/retrieve", {
					PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
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
				await axios.post(process.env.ROUTE_URL + "/profile/update", {
					PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
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
				await axios.post(process.env.ROUTE_URL + "/group/remove-member", {
					PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
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

// END ======================================================
