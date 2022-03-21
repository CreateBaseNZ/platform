import { Dispatch, SetStateAction, useContext } from "react";
import { useSelector } from "react-redux";
import { TCodeStepState } from "../../../store/reducers/codeStepReducer";
import { TState } from "../../../store/reducers/reducer";
import { CloseI } from "../../UI/CustomIcon";
import classes from "./CloseUnsavedModal.module.scss";

interface Props {
	closingUnsavedId: string;
	saveHandler: (callback?: () => any) => any;
	closeHandler: (fileId: string) => any;
	setClosingUnsavedId: Dispatch<SetStateAction<string>>;
}

const CloseUnsavedModal = ({ closeHandler, saveHandler, closingUnsavedId, setClosingUnsavedId }: Props): JSX.Element => {
	const { allFiles } = useSelector<TState, TCodeStepState>((state) => state.codeStep);

	const discardChangesHandler = () => {
		closeHandler(closingUnsavedId);
		setClosingUnsavedId("");
	};

	const saveAndCloseHandler = () => {
		saveHandler(() => {
			closeHandler(closingUnsavedId);
			setClosingUnsavedId("");
		});
	};

	return (
		<div className={classes.view}>
			<div className={classes.modal}>
				<div className={classes.h1}>
					Do you want to save {allFiles[closingUnsavedId].name}.{allFiles[closingUnsavedId].lang}?
					<button title="Close" onClick={() => setClosingUnsavedId("")}>
						<CloseI height={18} width={18} />
					</button>
				</div>
				<div className={classes.divider} />
				<div className={classes.h2}>Your changes will be lost if you don&apos;t save them</div>
				<div className={classes.btnContainer}>
					<button className={classes.fill} onClick={() => setClosingUnsavedId("")}>
						Cancel
					</button>
					<button className={classes.fill} onClick={discardChangesHandler}>
						Don&apos;t save
					</button>
					<button className={classes.outline} onClick={saveAndCloseHandler}>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default CloseUnsavedModal;
