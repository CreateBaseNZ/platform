// The API file located in ./api/signup.js
// IMPORT ===================================================

import axios from "axios";

// [REQUIREMENT] Output Object
const output = {
	email: "louiscflin@gmail.com",
	firstName: "Louis",
	lastName: "Lin",
	verified: true,
	isViewingGroup: true,
	recentGroups: [
		{ _id: "123", name: "Botany Downs Secondary School", role: "teacher", numOfUsers: { admins: 1, teachers: 3, students: 78 }, type: "school" },
		{ _id: "456", name: "The Doe's", role: "member", numOfUsers: { members: 5 }, type: "family" },
		{ _id: "789", name: "Rosehill College", role: "admin", numOfUsers: { admins: 2, teachers: 2, students: 64 }, type: "school" },
	],
	numOfGroups: 5,
};

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	// Validate PUBLIC_API_KEY
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error" });
	}
	// Create the user account and profile
	let data;
	if (req.body.status === "succeeded") {
		data = {
			status: "succeeded",
			content: output,
		};
	} else if (req.body.status === "failed 1") {
		// [REQUIREMENT] Failed Event #1
		data = {
			status: "failed",
			content: { email: "taken" },
		};
	} else if (req.body.status === "failed 2") {
		// [REQUIREMENT] Failed Event #2
		data = {
			status: "failed",
			content: { password: "incorrect" },
		};
	}
	// Return outcome of the request
	return res.send(data);
}

// HELPERS ==================================================

// END ======================================================
