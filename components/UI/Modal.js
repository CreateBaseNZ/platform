// TODO add enter transition animation to modals [FRONTEND]

import ClientOnlyPortal from "./ClientOnlyPortal";

import classes from "./Modal.module.scss";

const Modal = ({ setShow, title, backgroundColor, children }) => {
	return (
		<ClientOnlyPortal selector="#modal-root">
			<div className={classes.view}>
				<div className={classes.overlay} onClick={() => setShow(false)} style={{ backgroundColor: backgroundColor }} />
				<div className={classes.modal}>
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
