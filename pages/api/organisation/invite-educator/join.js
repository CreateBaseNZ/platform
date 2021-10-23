// IMPORT ===================================================

import axios from "axios";
import { getSession } from "next-auth/client";

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	// Validate PUBLIC_API_KEY
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error", content: "" });
	}
	// Perform access validation
	const session = await getSession({ req });
	let account;
	if (session) account = session.user.account;
	// Create the input data
	const input = {
		account,
		email: req.body.input.email,
		eduCode: req.body.input.eduCode,
		orgName: req.body.input.orgName,
		orgId: req.body.input.orgId,
		invCode: req.body.input.invCode,
		date: req.body.input.date,
	};
	// TODO: Validate input data
	// Send the request to the main backend
	let data;
	try {
		data = (await axios.post(process.env.ROUTE_URL + "/organisation/invite-educator/join", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input }))["data"];
	} catch (error) {
		return res.send({ status: "error", content: error });
	}
	// Return the response of the request
	return res.send(data);
}

// SECONDARY ================================================

// HELPER ===================================================
