import axios from "axios";
import { getSession } from "next-auth/client";

export default async function (req, res) {
	const object = req.body;
	// Validate access
	const session = await getSession({ req });
	if (!session) {
		return res.send({ status: "failed", content: "No user is logged in." });
	}
	if (session.user.access !== "admin") {
		return res.send({ status: "failed", content: "Invalid access." });
	}
	// TO DO: Perform additional validation
	// Construct input
	const input = {
		organisation: session.user.organisation,
		username: object.username,
		newUsername: object.newUsername,
		date: object.date,
	};
	// Send request
	let data;
	try {
		data = (await axios.post("https://createbase.co.nz/organisation-license/change-username/admin", input))["data"];
	} catch (error) {
		return res.send({ status: "error", content: error });
	}
	// Return outcome of the request
	return res.send(data);
}
