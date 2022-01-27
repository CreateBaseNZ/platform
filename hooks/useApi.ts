import router from "next/router";
import axios from "axios";
import { useCallback } from "react";

// TODO - @louis probably use generics to declare content shape for each API
export interface APIRes {
	status?: "succeeded" | "critical error" | "error" | "failed" | undefined;
	content?: any;
}

const useApi = () => {
	const reportError = useCallback(async (type = "", route = "", message = "", metadata = {}) => {
		axios.post("/api/error", {
			PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
			input: { type: type, route: route, date: new Date().toString(), message: message, metadata: metadata },
		});
	}, []);

	const post = useCallback(
		async (route = "", input = {}, successHandler: (data: any) => void = () => {}, failHandler: (data: any) => void = () => {}) => {
			let data: APIRes = {};
			try {
				data = (await axios.post(route, { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: input }))["data"] as APIRes;
			} catch (error) {
				data.status = "error";
			} finally {
				switch (data?.status) {
					case "critical error":
						reportError(router.asPath, "critical error", `A user in ${router.asPath} route encountered a critical error while making a request to ${route}`, { backendRoute: route, data });
						return router.push("/404");
					case "error":
						reportError(router.asPath, "error", `A user in ${router.asPath} route encountered an error while making a request to ${route}`, { backendRoute: route, data });
						return router.push("/404");
					case "failed":
						return failHandler(data);
					default:
						return successHandler(data);
				}
			}
		},
		[reportError]
	);

	return { post, reportError };
};

export default useApi;
