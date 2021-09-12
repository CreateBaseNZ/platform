import { createContext, useMemo, useState } from "react";

const InviteOrgContext = createContext({
	show: null,
	setShow: () => {},
});

export default InviteOrgContext;

export const InviteOrgContextProvider = (props) => {
	const [show, setShow] = useState(false);

	const value = useMemo(() => ({ show: show, setShow: setShow }), [show]);

	return <InviteOrgContext.Provider value={value}>{props.children}</InviteOrgContext.Provider>;
};
