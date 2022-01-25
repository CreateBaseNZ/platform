import { useCallback, useContext, useEffect } from "react";
import mixpanel from "mixpanel-browser";
import axios from "axios";
import GlobalSessionContext from "../store/global-session-context";
import { useRouter } from "next/router";

const useMixpanel = (eventName) => {
	const router = useRouter();
	const { globalSession } = useContext(GlobalSessionContext);

	useEffect(() => {
		if (!globalSession.loaded) return;
		console.log("mp init called");
		// initialise mixpanel channel
		// first param - API Key
		mixpanel.init(process.env.NEXT_PUBLIC_PROJECT_A_TOKEN);
		// set the distinct_id of the events that will be created
		mixpanel.identify(globalSession.profileId);
		// establish the associated user details for the specified id (business data)
		mixpanel.people.set({ $name: `${globalSession.firstName} ${globalSession.lastName}`, $email: globalSession.email });
	}, [globalSession.loaded, globalSession.profileId, globalSession.firstName, globalSession.lastName, globalSession.email]);

	useEffect(() => {
		if (!eventName || !router.isReady || !globalSession.loaded) return;
		console.log("mp tracking initialised");
		const inactivityTimer = 600000; // in ms
		const throttleInterval = 1000; // ms
		let throttleTimer = null;
		let sessionTimer = null;
		let startTime = null;
		let hasFocus = true;

		const endSession = (endTime = Date.now() - inactivityTimer) => {
			console.log("session ended");
			if (!startTime) return;
			let duration = endTime - startTime;
			console.log(startTime);
			console.log(endTime);
			console.log(Math.round(duration / 1000));
			track(eventName, {
				licenses: globalSession.groups.map((group) => group.licenseId),
				schools: globalSession.groups.map((group) => group.id),
				project: router.query.id,
				subsystem: router.query.subsystem,
				start: startTime,
				end: endTime,
				duration: Math.round(duration / 1000),
			});
			startTime = null;
		};

		const continueSession = () => {
			if (throttleTimer === null) {
				throttleTimer = setTimeout(() => {
					if (!hasFocus) return (throttleTimer = null);
					if (startTime === null) {
						startTime = Date.now();
						console.log("session started");
					} else {
						console.log("session continued");
					}
					clearTimeout(sessionTimer);
					sessionTimer = setTimeout(endSession, inactivityTimer); // inactive margin in ms
					throttleTimer = null;
				}, throttleInterval); // throttle interval in ms
			}
		};

		window.onmousemove = continueSession;
		window.onmousedown = continueSession;
		window.ontouchstart = continueSession;
		window.onclick = continueSession;
		window.onkeydown = continueSession;
		window.addEventListener("scroll", continueSession, true);
		window.addEventListener("blur", () => {
			hasFocus = false;
			endSession(Date.now());
		});
		window.addEventListener("focus", () => (hasFocus = true));
		window.addEventListener("beforeunload", () => endSession(Date.now()));
		continueSession();

		return () => {
			endSession(Date.now());
			window.onmousemove = null;
			window.onmousedown = null;
			window.ontouchstart = null;
			window.onclick = null;
			window.onkeydown = null;
			window.removeEventListener("scroll", continueSession);
			clearTimeout(sessionTimer);
			clearTimeout(throttleTimer);
		};
	}, [eventName, router.isReady, router.query, globalSession.loaded, globalSession.groups]);

	const init = useCallback(() => {
		// initialise mixpanel channel
		// first param - API Key
		mixpanel.init(process.env.NEXT_PUBLIC_PROJECT_A_TOKEN);
		// set the distinct_id of the events that will be created
		mixpanel.identify(globalSession.profileId);
		// establish the associated user details for the specified id (business data)
		mixpanel.people.set({ $name: `${globalSession.firstName} ${globalSession.lastName}`, $email: globalSession.email });
	}, [globalSession.profileId, globalSession.firstName, globalSession.lastName, globalSession.email]);

	// retrieving mixpanel data (via createbase backend)
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

	// mixpanel event tracking
	// first parameter is the event name
	// optional second parameter containining additional data to store
	const track = (event, payload) => {
		mixpanel.track(event, { ...payload });
	};

	// note: MUST run clearSession in the return of useEffect
	const trackActiveSession = (event) => {
		console.log("tracking initialised");
		const inactivityTimer = 600000; // in ms
		const throttleInterval = 1000; // ms
		let throttleTimer = null;
		let sessionTimer = null;
		let startTime = null;
		let hasFocus = true;

		const endSession = (endTime = Date.now() - inactivityTimer) => {
			console.log("session ended");
			if (!startTime) return;
			let duration = endTime - startTime;
			console.log(startTime);
			console.log(endTime);
			console.log(Math.round(duration / 1000));
			track(event, {
				licenses: globalSession.groups.map((group) => group.licenseId),
				schools: globalSession.groups.map((group) => group.id),
				project: router.query.id,
				subsystem: router.query.subsystem,
				start: startTime,
				end: endTime,
				duration: Math.round(duration / 1000),
			});
			startTime = null;
		};

		const continueSession = () => {
			if (throttleTimer === null) {
				throttleTimer = setTimeout(() => {
					if (!hasFocus) return (throttleTimer = null);
					if (startTime === null) {
						startTime = Date.now();
						console.log("session started");
					} else {
						console.log("session continued");
					}
					clearTimeout(sessionTimer);
					sessionTimer = setTimeout(endSession, inactivityTimer); // inactive margin in ms
					throttleTimer = null;
				}, throttleInterval); // throttle interval in ms
			}
		};

		// cleanup
		const clearSession = () => {
			endSession(Date.now());
			window.onmousemove = null;
			window.onmousedown = null;
			window.ontouchstart = null;
			window.onclick = null;
			window.onkeydown = null;
			window.removeEventListener("scroll", continueSession);
			clearTimeout(sessionTimer);
			clearTimeout(throttleTimer);
		};

		window.onmousemove = continueSession;
		window.onmousedown = continueSession;
		window.ontouchstart = continueSession;
		window.onclick = continueSession;
		window.onkeydown = continueSession;
		window.addEventListener("scroll", continueSession, true);
		window.addEventListener("blur", () => {
			hasFocus = false;
			endSession(Date.now());
		});
		window.addEventListener("focus", () => (hasFocus = true));
		window.addEventListener("beforeunload", () => endSession(Date.now()));
		continueSession();

		return clearSession;
	};

	return { init, retrieve, track, trackActiveSession };
};

export default useMixpanel;
