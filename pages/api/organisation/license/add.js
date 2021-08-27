import axios from "axios";
import { getSession } from "next-auth/client";

function validate(object = {}) {
	return new Promise(async (resolve, reject) => {
		// Declare variables
		let valid = true;
		let errors = [];
		// TO DO: Perform validation
		// Process the outcome of the validation
		if (valid) {
			return resolve();
		} else {
			return reject({ status: "failed", content: errors });
		}
	});
}

export default async function (req, res) {
	if (req.method !== "POST") return;
	// Validate user authentication and access
	const session = await getSession({ req });
	if (!session) {
		return res.send({
			status: "failed",
			content: "There is no user logged in.",
		});
	} else if (!session.user.access.admin) {
		return res.send({
			status: "failed",
			content: "Invalid access.",
		});
	}
	// Validate inputs
	const object = req.body;
	try {
		await validate(object);
	} catch (data) {
		return res.send(data);
	}
	// Send request to our main backend
	let data;
	try {
		data = (
			await axios.post("https://createbase.co.nz/organisation-license/add", {
				username: object.username,
				password: object.password,
				date: object.date,
				status: object.status,
				access: object.access,
				organisation: session.user.organisation,
			})
		)["data"];
	} catch (error) {
		data = { status: "error", content: error };
	}
	// Send outcome
	return res.send(data);
}
