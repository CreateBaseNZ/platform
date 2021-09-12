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
	let account;
	const session = await getSession({ req });
	if (session) {
		if (session.user.organisation) {
			// Validate the user is in an organisation
			return res.send({ status: "failed", content: { account: "already in an organisation" } });
		} else if (session.user.access !== "educator" /*|| !session.user.verified*/) {
			// Validate if the user is an educator
			return res.send({ status: "error", content: "not an educator" });
		}
		account = session.user.account;
	}
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
