// TODO remove this

import axios from "axios";

const retrieve = (filters = []) => {
	return new Promise(async (resolve, reject) => {
		let data;
		try {
			data = (await axios.post("/api/tracking", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: { filters } }))["data"];
		} catch (error) {
			return reject({ status: "error", content: error });
		}
		if (data.status !== "succeeded") return reject(data);
		return resolve(data.content);
	});
};

export default { retrieve };
