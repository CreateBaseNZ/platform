import axios from "axios";
import moment from "moment-timezone";

const preprocess = (PROJECT_SECRET, fromDate = "2021-01-01", toDate = moment().tz("Pacific/Auckland").format("YYYY-MM-DD")) => {
	return new Promise(async (resolve, reject) => {
		let data;
		try {
			data = (await axios.post("/tracking", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: { PROJECT_SECRET, fromDate, toDate } }))["data"];
		} catch (error) {
			return reject({ status: "error", content: error });
		}
		if (data.status !== "succeeded") return reject(data);
		return resolve(data.content);
	});
};

const postprocess = (rawData, filters = []) => {
	// Process 2
	rawData = rawData.split("\n");
	rawData.pop();
	let outputs = [];
	for (let i = 0; i < rawData.length; i++) {
		rawData[i] = JSON.parse(rawData[i]);
		// Check if there's any filter provided
		let add = false;
		if (filters.length) {
			// Check if the rawData[i] has a filter with the said event name
			const filter = filters.find((el) => el.event === rawData[i].event);
			if (!filter) continue;
			// Filter the data based on the property combination
			if (filter.properties) {
				for (let j = 0; j < filter.properties.length; j++) {
					const el = filter.properties[j];
					let valid = true;
					for (const key in el) {
						if (Array.isArray(rawData[i].properties[key])) {
							if (!rawData[i].properties[key].includes(el[key])) valid = false;
						} else {
							if (rawData[i].properties[key] !== el[key]) valid = false;
						}
					}
					if (valid) {
						add = true;
						break;
					}
				}
			} else {
				add = true;
			}
		} else {
			add = true;
		}
		if (add) outputs.push(rawData[i]);
	}
	return outputs;
};

export default {
	preprocess,
	postprocess,
};
