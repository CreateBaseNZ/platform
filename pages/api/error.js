// TODO: Integration - Documentation complete
// IMPORT ===================================================

import axios from "axios";
import { getSession } from "next-auth/react";

// TEST OUTPUT ==============================================

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) return res.send({ status: "critical error" });
	const session = await getSession({ req });
	// Fetch the user's account detail
	let email, profile;
	try {
		[email, profile] = await fetchAccount(session.user);
	} catch (error) {
		return res.send(error);
	}
	const input = req.body.input;
	const url = process.env.ROUTE_URL + "/error/new";
	const keys = { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY };
	const backendInput = { email, profile, route: input.route, type: input.type, date: input.date, message: input.message, metadata: input.metadata };
	console.log(backendInput);
	if (process.env.DEPLOYMENT !== "production") return;
	let data;
	try {
		data = (await axios.post(url, { ...keys, input: backendInput }))["data"];
	} catch (error) {
		data = { status: "error", content: error };
	}
	if (data.status !== "succeeded") return res.send({ status: "error" });
	return res.send({ status: "succeeded" });
}

// HELPERS ==================================================

function fetchAccount(accountId) {
	return new Promise(async (resolve, reject) => {
		const url = process.env.ROUTE_URL + "/account/retrieve";
		const keys = { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY };
		const input = { query: { _id: accountId } };
		let data;
		try {
			data = (await axios.post(url, { ...keys, input }))["data"];
		} catch (error) {
			data = { status: "error", content: error };
		}
		if (data.status !== "succeeded") return reject(data);
		return resolve([data.content[0].email, data.content[0].profile]);
	});
}

// END ======================================================
