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
	// Integration Logic
	let data;
	try {
		data = (
			await axios.post(process.env.ROUTE_URL + "/class/update", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: {
					query: { _id: input.classId },
					updates: [{ type: "name", update: { name: input.name, group: input.groupId } }],
					date: input.date,
				},
			})
		)["data"];
	} catch (error) {
		data = { status: "error", content: error };
	}
	if (data.status !== "succeeded") {
		if (data.status === "failed" && data.content.class === "taken") {
			data.content = "name taken";
		} else {
			return res.send({ status: "error" });
		}
	}
	return res.send(data);
}

// HELPERS ==================================================

// END ======================================================
