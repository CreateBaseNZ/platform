import axios from "axios";
import { getSession } from "next-auth/client";

export default async function (req, res) {
	// Validate Access
	const session = await getSession({ req });
	if (!session) {
		return res.send({ status: "failed", content: "No user is logged in." });
	}
	if (session.user.access !== "admin") {
		return res.send({ status: "failed", content: "Invalid access." });
	}
	// Send the request
	let data;
	try {
		data = (await axios.post("https://createbase.co.nz/organisation/retrieve-data/admin", { organisation: session.user.organisation }))["data"];
	} catch (error) {
		return res.send({ status: "error", content: error });
	}
	// Return outcome of the request
	return res.send(data);
}
