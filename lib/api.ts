import axios from "axios";
import Router from "next/router";

const reportError = async (route: string, type: string, message: string, metadata = {}) => {
	axios.post("/api/error", {
		PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
		input: { type: type, route: route, date: new Date().toString(), message: message, metadata: metadata },
	});
};

// TODO - @louis probably use generics to declare content shape for each API
interface APIRes {
	status?: "succeeded" | "critical error" | "error" | "failed" | undefined;
	content?: any;
}

// TODO - @louis find a way to type check route and input
const post = async (route: string, input: any = {}, successHandler: (data: any) => void = () => {}, failHandler: (data: any) => void = () => {}) => {
	let data: APIRes = {};
	try {
		data = (await axios.post(route, { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: input }))["data"] as APIRes;
	} catch (error) {
		data.status = "error";
	} finally {
		switch (data?.status) {
			case "critical error":
				reportError(Router.asPath, "critical error", `A user in ${Router.asPath} route encountered a critical error while making a request to ${route}`, { backendRoute: route, data });
				return Router.push("/404");
			case "error":
				reportError(Router.asPath, "error", `A user in ${Router.asPath} route encountered an error while making a request to ${route}`, { backendRoute: route, data });
				return Router.push("/404");
			case "failed":
				return failHandler(data);
			default:
				return successHandler(data);
		}
	}
};

export default post;
