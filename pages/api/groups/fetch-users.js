// TODO: Integration - Backend

// IMPORT ===================================================

import axios from "axios";

// TEST OUTPUT ==============================================

const DUMMY_USERS = [
	{
		accountId: "accountId123", // not sure whether to pass account or profile ID or both
		profileId: "profileId123", // not sure whether to pass account or profile ID or both
		firstName: "Cash",
		lastName: "Buttercup",
		role: "student",
	},
	{
		accountId: "accountId123", // not sure whether to pass account or profile ID or both
		profileId: "profileId123", // not sure whether to pass account or profile ID or both
		firstName: "Cash",
		lastName: "Buttercup",
		role: "student",
	},
	{
		accountId: "accountId123", // not sure whether to pass account or profile ID or both
		profileId: "profileId123", // not sure whether to pass account or profile ID or both
		firstName: "Cash",
		lastName: "Buttercup",
		role: "teacher",
	},
	{
		accountId: "accountId123", // not sure whether to pass account or profile ID or both
		profileId: "profileId123", // not sure whether to pass account or profile ID or both
		firstName: "Cash",
		lastName: "Buttercup",
		role: "admin",
	},
];

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error" });
	}
	// Test Logic
	let data;
	if (req.body.status === "succeeded") {
		data = {
			status: "succeeded",
			content: DUMMY_USERS,
		};
	} else if (req.body.status === "failed 1") {
		// this fail mode is only required if we double check access
		// do we want to allow teachers to be able to access Manage Group but only the Students tab?
		data = {
			status: "failed",
			content: "unauthorised",
		};
	}
	return res.send(data);
}

// HELPERS ==================================================

// END ======================================================
