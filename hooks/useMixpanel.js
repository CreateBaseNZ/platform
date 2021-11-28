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

	return { init, read, track };
};

export default useMixpanel;
