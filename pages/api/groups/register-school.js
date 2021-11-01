// TODO: Integration - Backend

// IMPORT ===================================================

import axios from "axios";

// OUTPUT ===================================================

const DUMMY_SENT = {
	sent: true,
};

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
	// 		content: DUMMY_SENT, // does not require content
	// 	};
	// }
	// Integration Logic
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
	console.log(data2);
	if (data2.status !== "succeeded") return res.send({ status: "error" });
	console.log("succeeded");
	return res.send({ status: "succeeded" });
}

// HELPER ===================================================

// END  =====================================================
