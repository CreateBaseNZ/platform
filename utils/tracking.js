import axios from "axios";
// import moment from "moment";

const retrieve = (filters = []) => {
	return new Promise(async (resolve, reject) => {
		// Run this code if in development
		let data;
		try {
			data = (await axios.post("https://dev.createbase.co.nz/tracking"))["data"];
		} catch (error) {
			data = { status: "error", content: error };
		}
		if (data.status !== "succeeded") return reject({ status: "error" });
		data.content = data.content.split("\n");
		data.content.pop();
		let outputs = [];
		for (let i = 0; i < data.content.length; i++) {
			data.content[i] = JSON.parse(data.content[i]);
			// Check if there's any filter provided
			let add = false;
			if (filters.length) {
				// Check if the data.content[i] has a filter with the said event name
				const filter = filters.find((el) => el.event === data.content[i].event);
				if (!filter) continue;
				// Filter the data based on the property combination
				if (filter.properties) {
					for (let j = 0; j < filter.properties.length; j++) {
						const el = filter.properties[j];
						let valid = true;
						for (const key in el) {
							if (data.content[i].properties[key] !== el[key]) valid = false;
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
			if (add) outputs.push(data.content[i]);
		}
		return resolve(outputs);
		// // Run this code if in production
		// const date = moment.utc().format("YYYY-MM-DD");
		// let data;
		// try {
		// 	data = (
		// 		await axios.get(`https://data.mixpanel.com/api/2.0/export?from_date=2021-01-01&to_date=${date}`, {
		// 			headers: { Authorization: "Basic Yzk3NmNkMjFmYWViOTdhNmI0NzE2YWFkZDI4ODBjNDM6", Accept: "text/plain" },
		// 		})
		// 	)["data"];
		// } catch (error) {
		// 	return reject({ status: "error", content: error });
		// }
		// return resolve(JSON.parse(data.content));
	});
};

export default {
	retrieve,
};
