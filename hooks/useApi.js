import router from "next/router";
import axios from "axios";

const useApi = () => {
	const reportError = async (input) => {
		console.log(input);
		axios.post("/api/error", {
			PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
			input: { type: input.type, route: input.route.route, date: new Date().toString(), metadata: input.metadata },
		});
	};

	const post = async ({ route = "", input = {}, failHandler = () => {}, successHandler = () => {} }) => {
		let data = {};
		try {
			data = (await axios.post(route, { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: input }))["data"];
		} catch (error) {
			data.status = "error";
		} finally {
			switch (data.status) {
				case "critical error":
					reportError({ route: route, type: "critical error", metadata: data });
					return router.push("/404");
				case "error":
					reportError({ route: route, type: "error", metadata: data });
					return router.push("/404");
				case "failed":
					reportError({ route: route, type: "failed", metadata: data });
					return failHandler(data);
				default:
					return successHandler(data);
			}
		}
	};

	return { post, reportError };
};

export default useApi;
