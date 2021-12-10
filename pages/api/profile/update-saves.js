// IMPORT ===================================================

import axios from "axios";

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	// Validate PUBLIC_API_KEY
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error" });
	}
	const input = req.body.input;
	// Send the data to the main backend
	const url = process.env.ROUTE_URL + "/profile/update";
	const keys = { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY };
	const backendInput = { query: { _id: input.profileId }, updates: [{ type: "saves", update: input.update }], date: input.date };
	let data;
	try {
		data = (await axios.post(url, { ...keys, input: backendInput }))["data"];
	} catch (error) {
		return res.send({ status: "error", content: error });
	}
	// Execute additional functions
	let accountId;
	let provider;
	if (data.content.account.local) {
		accountId = data.content.account.local;
		provider = "credentials";
	} else if (data.content.account.google) {
		accountId = data.content.account.google;
		provider = "google";
	}
	try {
		await processors(input.update, accountId, provider);
	} catch (error) {
		return res.send(error);
	}
	// Return outcome of the request
	return res.send(data);
}

// HELPER ===================================================

function processors(update, accountId, provider) {
	return new Promise(async (resolve, reject) => {
		for (const key in update) {
			switch (key) {
				case "onboardingStatuses":
					try {
						await onboardingProcessor(update[key], accountId, provider);
					} catch (error) {
						return reject(error);
					}
					break;
				default:
					break;
			}
		}
		// Success handler
		return resolve();
	});
}

function onboardingProcessor(statuses, accountId, provider) {
	return new Promise(async (resolve, reject) => {
		if (statuses["getting-started"] && statuses["flow-0"] && statuses["not-group"]) {
			try {
				await sendEmailBaseTasksCompleted(accountId, provider);
			} catch (error) {
				return reject(error);
			}
		}
		if (
			statuses["getting-started"] &&
			statuses["flow-0"] &&
			statuses["group-0"] &&
			statuses["group-1"] &&
			statuses["group-2"] &&
			statuses["group-3"] &&
			statuses["group-4"] &&
			statuses["group-5"] &&
			statuses["not-group"] &&
			statuses["support-0"]
		) {
			try {
				await sendEmailAllTasksCompleted(accountId, provider);
			} catch (error) {
				return reject(error);
			}
		}
		// Success handler
		return resolve();
	});
}

function sendEmailBaseTasksCompleted(accountId, provider) {
	return new Promise(async (resolve, reject) => {
		// Construct the input object
		const input = {
			user: { accountId, provider },
			option: { receive: "base-tasks-completed", notification: "onboarding", tone: "friendly" },
		};
		// Send the processing request
		let data;
		try {
			data = (await axios.post(process.env.ROUTE_URL + "/mail/send-email", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input }))["data"];
		} catch (error) {
			data = { status: "error", content: error };
		}
		// Error handler
		if (data.status !== "succeeded") return reject({ status: "error" });
		// Success handler
		return resolve();
	});
}

function sendEmailAllTasksCompleted(accountId, provider) {
	return new Promise(async (resolve, reject) => {
		// Construct the input object
		const input = {
			user: { accountId, provider },
			option: { receive: "all-tasks-completed", notification: "onboarding", tone: "friendly" },
		};
		// Send the processing request
		let data;
		try {
			data = (await axios.post(process.env.ROUTE_URL + "/mail/send-email", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input }))["data"];
		} catch (error) {
			data = { status: "error", content: error };
		}
		// Error handler
		if (data.status !== "succeeded") return reject({ status: "error" });
		// Success handler
		return resolve();
	});
}

// END  =====================================================
