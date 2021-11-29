import { useContext, useEffect, useState } from "react";
import mixpanel from "mixpanel-browser";
import GlobalSessionContext from "../store/global-session-context";
import tracking from "../utils/tracking";

const useMixpanel = () => {
	const { globalSession } = useContext(GlobalSessionContext);

	const init = () => {
		// initialise mixpanel channel
		// first param - API Key
		mixpanel.init(process.env.NEXT_PUBLIC_PROJECT_A_TOKEN);
		// set the distinct_id of the events that will be created
		mixpanel.identify(globalSession.profileId);
		// establish the associated user details for the specified id (business data)
		mixpanel.people.set({ $name: `${globalSession.firstName} ${globalSession.lastName}`, $email: globalSession.email });
	};

	const read = async (filters, callback) => {
		let data;
		try {
			data = await tracking.retrieve(process.env.NEXT_PUBLIC_PROJECT_A_SECRET, filters);
		} catch (error) {
			// TODO: Error handling
		} finally {
			callback(data);
		}
	};

	// mixpanel event tracking
	// first parameter is the event name
	// optional second parameter containining additional data to store
	const track = (event, data) => {
		mixpanel.track(event, data);
	};

	const trackActiveSession = (event, data) => {
		console.log("tracking started");
		const inactivityTimer = 30000; // in ms
		const throttleInterval = 1000; // ms
		let throttleTimer = null;
		let sessionTimer = null;
		let startTime = Date.now();
		console.log("session started");

		const endSession = () => {
			const endTime = Date.now();
			console.log("session ended");
			let duration = endTime - startTime;
			// session not force ended (i.e. via clearSession())
			if (duration > inactivityTimer) {
				duration -= inactivityTimer;
			}
			console.log(duration);
			track(event, { ...data, start: startTime, end: endTime, duration: Math.round(duration / 1000) });
			startTime = null;
		};

		const continueSession = () => {
			if (throttleTimer === null) {
				throttleTimer = setTimeout(() => {
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
		console.log(window);

		// cleanup
		const clearSession = () => {
			endSession();
			window.onmousemove = null;
			window.onmousedown = null;
			window.ontouchstart = null;
			window.onclick = null;
			window.onkeydown = null;
			window.removeEventListener("scroll", continueSession);
			clearTimeout(sessionTimer);
			clearTimeout(throttleTimer);
		};

		return clearSession;
	};

	return { init, read, track, trackActiveSession };
};

export default useMixpanel;
