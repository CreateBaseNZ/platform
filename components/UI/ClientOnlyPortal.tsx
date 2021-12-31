import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ClientOnlyPortalProps {
	children: JSX.Element;
	selector: string;
}

const ClientOnlyPortal = ({ children, selector }: ClientOnlyPortalProps): JSX.Element | null => {
	const [mounted, setMounted] = useState(false);
	const el = document.querySelector(selector);

	useEffect(() => {
		setMounted(true);
		return () => setMounted(false);
	}, [selector]);

	return mounted && el ? createPortal(children, el) : null;
};

export default ClientOnlyPortal;
