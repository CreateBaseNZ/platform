import router from "next/router";
import axios from "axios";

const useApi = () => {
	const reportError = async (input) => {
		if (router.asPath === "/404") return;
		axios.post("/api/error", {
			PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
			input: { type: input.type, route: input.route, date: new Date().toString(), message: input.message, metadata: input.metadata },
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
					reportError({
						route: router.asPath,
						type: "critical error",
						message: `A user in ${router.asPath} route encountered a critical error while making a request to ${route}`,
						metadata: { backendRoute: route, data },
					});
					return router.push("/404");
				case "error":
					reportError({
						route: router.asPath,
						type: "error",
						message: `A user in ${router.asPath} route encountered an error while making a request to ${route}`,
						metadata: { backendRoute: route, data },
					});
					return router.push("/404");
				case "failed":
					return failHandler(data);
				default:
					return successHandler(data);
			}
		}
	};

	return { post, reportError };
};

export default useApi;
