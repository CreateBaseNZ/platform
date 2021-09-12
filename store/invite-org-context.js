import { createContext, useMemo, useState } from "react";

const InviteOrgContext = createContext({
	show: null,
	setShow: () => {},
	details: { isInvited: false },
	setDetails: () => {},
});

export default InviteOrgContext;

export const InviteOrgContextProvider = (props) => {
	const [show, setShow] = useState(false);
	const [details, setDetails] = useState({ isInvited: false });

	console.log(details);

	const value = useMemo(() => ({ show: show, setShow: setShow, details: details, setDetails: setDetails }), [show, details]);

	return <InviteOrgContext.Provider value={value}>{props.children}</InviteOrgContext.Provider>;
};
