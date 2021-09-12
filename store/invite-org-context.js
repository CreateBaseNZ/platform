import { createContext, useMemo, useState } from "react";

const InviteOrgContext = createContext({
	show: null,
	setShow: () => {},
	details: {},
	setDetails: () => {},
});

export default InviteOrgContext;

export const InviteOrgContextProvider = (props) => {
	const [show, setShow] = useState(false);
	const [details, setDetails] = useState({});

	const value = useMemo(() => ({ show: show, setShow: setShow, details: details, setDetails: setDetails }), [show, details]);

	return <InviteOrgContext.Provider value={value}>{props.children}</InviteOrgContext.Provider>;
};
