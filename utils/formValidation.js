import axios from "axios";

import blacklist from "./blacklist";

export const emailPattern = {
	value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	message: "Please enter a valid email address",
};

export const usernameMinLength = {
	value: 3,
	message: "Usernames must be at least 3 characters long",
};

export const usernamePattern = {
	value: /^[\w-]+$/,
	message: "Usernames can only contain alphanumeric, -, and _",
};

export const displayNameMinLength = {
	value: 3,
	message: "Display names must be at least 3 characters long",
};

export const displayNamePattern = {
	value: /^[a-zA-Z\-\. ]+$/,
	message: "Display names can only contain A—Z, a—z, -, and .",
};

export const isBlacklisted = (str) => {
	return blacklist.some((v) => str.includes(v));
};

export const querySchoolAPI = async (schoolId, schoolName) => {
	let data;
	try {
		data = (await axios(`https://catalogue.data.govt.nz/api/3/action/datastore_search?resource_id=20b7c271-fd5a-4c9e-869b-481a0e2453cd&q=${schoolId}%20${schoolName}`))["data"];
	} catch (error) {
		data = { status: "error", content: error };
	}

	return data;
};

export const passwordMinLength = {
	value: 8,
	message: "Passwords must be at least 8 characters long",
};

export const passwordValidate = (v) => {
	const errors = [];
	if (!v.match(/(?=.*[a-z]){8,}/)) {
		errors.push("lowercase letter");
	}
	if (!v.match(/(?=.*[A-Z]){8,}/)) {
		errors.push("uppercase letter");
	}
	if (!v.match(/(?=.*?[0-9]){8,}/)) {
		errors.push("digit");
	}
	if (!v.match(/(?=.*?[#?!@$%^&*-]){8,}/)) {
		errors.push("special character");
	}

	return errors.length && "Requires at least one: " + errors.join(", ");
};
