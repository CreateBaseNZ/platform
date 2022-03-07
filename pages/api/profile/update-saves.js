// IMPORT ===================================================

import axios from "axios";

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	// Validate API_KEY_PUBLIC
	if (req.body.API_KEY_PUBLIC !== process.env.API_KEY_PUBLIC) {
		return res.send({ status: "critical error" });
	}
	const input = req.body.input;
	// Send the data to the main backend
	const url = process.env.PREFIX_BACKEND + "/profile/update";
	const keys = { API_KEY_PRIVATE: process.env.API_KEY_PRIVATE };
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
			data = (await axios.post(process.env.PREFIX_BACKEND + "/mail/send-email", { API_KEY_PRIVATE: process.env.API_KEY_PRIVATE, input }))["data"];
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
			data = (await axios.post(process.env.PREFIX_BACKEND + "/mail/send-email", { API_KEY_PRIVATE: process.env.API_KEY_PRIVATE, input }))["data"];
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
