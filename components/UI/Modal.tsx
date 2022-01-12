// TODO add enter transition animation to modals [FRONTEND]

import { ReactNode } from "react";
import ClientOnlyPortal from "./ClientOnlyPortal";

import classes from "./Modal.module.scss";

type ModalProps = {
	setShow: (_: boolean) => void;
	title: string;
	children: ReactNode;
	backgroundColor?: string;
	width?: string;
};

const Modal = ({ setShow, title, backgroundColor, width, children }: ModalProps): JSX.Element => {
	return (
		<ClientOnlyPortal selector="#modal-root">
			<div className={classes.view}>
				<div className={classes.overlay} onClick={() => setShow(false)} style={{ backgroundColor: backgroundColor }} />
				<div className={classes.modal} style={{ width: width }}>
					<h2>{title}</h2>
					<i className={`material-icons-outlined ${classes.close}`} onClick={() => setShow(false)}>
						close
					</i>
					{children}
				</div>
			</div>
		</ClientOnlyPortal>
	);
};

export default Modal;
