import axios from "axios";
import moment from "moment";
// import moment from "moment";

const retrieve = (PROJECT_SECRET, filters = [], fromDate = "2021-01-01", toDate = moment.utc().format("YYYY-MM-DD")) => {
	return new Promise(async (resolve, reject) => {
		let rawData;
		if (process.env.NEXT_PUBLIC_DEPLOYMENT === "development") {
			// Run this code if in development
			let data;
			try {
				data = (await axios.post("https://dev.createbase.co.nz/tracking", { input: { PROJECT_SECRET, fromDate, toDate } }))["data"];
			} catch (error) {
				data = { status: "error", content: error };
			}
			if (data.status !== "succeeded") return reject({ status: "error" });
			rawData = data.content;
		} else if (process.env.NEXT_PUBLIC_DEPLOYMENT === "production") {
			// Run this code if in production
			let data;
			try {
				data = (
					await axios.get(`https://data.mixpanel.com/api/2.0/export?from_date=${fromDate}&to_date=${toDate}`, {
						headers: { Authorization: PROJECT_SECRET, Accept: "text/plain" },
					})
				)["data"];
			} catch (error) {
				return reject({ status: "error", content: error });
			}
			rawData = data;
		}
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
		return resolve(outputs);
	});
};

export default {
	retrieve,
};
