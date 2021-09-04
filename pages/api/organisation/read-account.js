import axios from "axios";
import { getSession } from "next-auth/client";

export default async function (req, res) {
	if (req.method !== "POST") return;
	// Validate PUBLIC_API_KEY
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.status(403).send({ status: "critical error", content: "Invalid API Key" });
	}
	// Check if a session exist
	const session = await getSession({ req });
	if (!session) {
		return res.status(400).send({ status: "critical error", content: "Please log in" });
	}
	// Validate if the user is an admin
	if (session.user.access !== "admin" && session.user.access !== "educator") {
	}
	if (session.user.access === "learner") {
	} else if (session.user.access === "admin" /*&& session.user.verified*/) {
	} else if (session.user.access === "educator" /*&& session.user.verified*/) {
	} else {
		return res.status(400).send({ status: "critical error", content: "Invalid access" });
	}
	// Create the input data
	const input = { organisation: session.user.organisation };
	// Send the request
	let data;
	try {
		data = (await axios.post("https://createbase.co.nz/organisation/account-read", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input }))["data"];
	} catch (error) {
		return res.send({ status: "error", content: error });
	}
	// Return outcome of the request
	return res.send(data);
}
