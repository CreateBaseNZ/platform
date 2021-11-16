import router from "next/router";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import GlobalSessionContext from "../store/global-session-context";
import useHandleResponse from "./useHandleResponse";

const useClass = () => {
	const { globalSession } = useContext(GlobalSessionContext);
	const { handleResponse } = useHandleResponse();
	const [classObject, setClassObject] = useState({});
	const [classLoaded, setClassLoaded] = useState(false);

	useEffect(async () => {
		if (router?.query?.id) {
			const DUMMY_STATUS = "succeeded";
			const inputs = { profileId: globalSession.profileId, schoolId: globalSession.groups[globalSession.recentGroups[0]].id, classId: router.query.id };
			let data = {};
			try {
				data = (await axios.post("/api/classes/fetch-one", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: inputs, status: DUMMY_STATUS }))["data"];
			} catch (error) {
				data.status = "error";
			} finally {
				handleResponse({
					data,
					failHandler: () => {
						if (data.content === "not found") {
							router.replace("/404");
						}
					},
					successHandler: () => {
						setClassObject(data.content);
						setClassLoaded(true);
					},
				});
			}
		}
	}, [router]);

	return { classObject, setClassObject, classLoaded };
};

export default useClass;
