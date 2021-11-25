// TODO
import Modal from "../UI/Modal";

import classes from "./DuplicateWarning.module.scss";

const DuplicateWarning = ({ setShow, group }) => {
	return (
		<Modal title={`We found another school with the same name from ${group.location.country}`} setShow={setShow}>
			hello
		</Modal>
	);
};

export default DuplicateWarning;
