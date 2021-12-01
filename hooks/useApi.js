import { useContext, useEffect } from "react";
import router from "next/router";
import axios from "axios";
import GlobalSessionContext from "../store/global-session-context";

const useApi = () => {
	const { globalSession } = useContext(GlobalSessionContext);

	const reportError = async (input) => {
		console.log(input);
		let data = {};
		try {
			data = await axios.post("/api/error", {
				PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
				input: {
					...input,
					email: globalSession.email,
					date: new Date.toString(),
					profile: globalSession.profileId,
				},
			})["data"];
		} catch (error) {
			data.status = "error";
		} finally {
			console.log(data);
		}
	};

	const post = async ({ route = "", input = {}, failHandler = () => {}, successHandler = () => {} }) => {
		let data = {};
		try {
			data = (
				await axios.post(route, {
					PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
					input: input,
				})
			)["data"];
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
