import { memo, useEffect, useRef } from "react";
import { getConnectedEdges, isEdge } from "react-flow-renderer";
import classes from "./FlowContextMenu.module.scss";

export const NodeContextMenu = memo(({ show, x, y, node, elements, blurHandler, selectHandler, copyHandler, deleteHandler, selectAllHandler, clearAllHandler }) => {
	const ref = useRef();

	useEffect(() => {
		ref.current.focus();
	});

	let alignBottom = false;
	if (document.body.clientHeight - y < 160) {
		alignBottom = document.body.clientHeight - y;
	}
	let alignRight = false;
	if (document.body.clientWidth - x < 230) {
		alignRight = document.body.clientWidth - x;
	}

	return (
		<div
			className={classes.contextMenu}
			style={{
				display: !show && "none",
				top: !alignBottom && y,
				left: !alignRight && x,
				bottom: alignBottom && alignBottom,
				right: alignRight && alignRight,
			}}
			tabIndex={0}
			onBlur={blurHandler}
			ref={ref}>
			<button onMouseDown={() => selectHandler(node)}>
				<div className={classes.item}>
					<span className="material-icons-outlined">call_to_action</span>
					Select
				</div>
				<p className={classes.hotkey}>Left Click</p>
			</button>
			<button onMouseDown={() => copyHandler([node])}>
				<div className={classes.item}>
					<span className="material-icons-outlined">content_copy</span> Copy
				</div>
				<p className={classes.hotkey}>Ctrl+C</p>
			</button>
			<button
				onMouseDown={() => {
					console.log(
						getConnectedEdges(
							[node],
							elements.filter((el) => isEdge(el))
						)
					);
					deleteHandler([
						node,
						...getConnectedEdges(
							[node],
							elements.filter((el) => isEdge(el))
						),
					]);
				}}>
				<div className={classes.item}>
					<span className="material-icons-outlined">delete</span>
					Delete
				</div>
				<p className={classes.hotkey}>Backspace</p>
			</button>
			<div className={classes.divider} />
			<button onMouseDown={selectAllHandler}>
				<div className={classes.item}>
					<span className="material-icons-outlined">select_all</span>
					Select All
				</div>
				<p className={classes.hotkey}>Ctrl+A</p>
			</button>
			<button onMouseDown={clearAllHandler}>
				<div className={classes.item}>
					<span className="material-icons-outlined">backspace</span>
					Clear All
				</div>
				<p className={classes.hotkey}>Ctrl+B</p>
			</button>
		</div>
	);
});

export const PaneContextMenu = memo(
	({ show, x, y, allowUndo, allowRedo, flowLocked, blurHandler, pasteHandler, undoHandler, redoHandler, saveHandler, restoreHandler, fitViewHandler, captureHandler, lockHandler, infoHandler }) => {
		const ref = useRef();
		useEffect(() => {
			ref.current.focus();
		});

		let alignBottom = false;
		if (document.body.clientHeight - y < 250) {
			alignBottom = document.body.clientHeight - y;
		}
		let alignRight = false;
		if (document.body.clientWidth - x < 230) {
			alignRight = document.body.clientWidth - x;
		}

		return (
			<div
				className={classes.contextMenu}
				style={{
					display: !show && "none",
					top: !alignBottom && y,
					left: !alignRight && x,
					bottom: alignBottom && alignBottom,
					right: alignRight && alignRight,
				}}
				tabIndex={0}
				onBlur={blurHandler}
				ref={ref}>
				<button onMouseDown={pasteHandler.bind(this, x, y)}>
					<div className={classes.item}>
						<span className="material-icons-outlined">content_paste</span> Paste
					</div>
					<p className={classes.hotkey}>Ctrl+Z</p>
				</button>
				<button className={allowUndo ? "" : classes.deactive} onMouseDown={undoHandler}>
					<div className={classes.item}>
						<span className="material-icons-outlined">undo</span> Undo
					</div>
					<p className={classes.hotkey}>Ctrl+Z</p>
				</button>
				<button className={allowRedo ? "" : classes.deactive} onMouseDown={redoHandler}>
					<div className={classes.item}>
						<span className="material-icons-outlined">redo</span> Redo
					</div>
					<p className={classes.hotkey}>Ctrl+Y</p>
				</button>
				<button onMouseDown={saveHandler}>
					<div className={classes.item}>
						<span className="material-icons-outlined">save</span>
						Save
					</div>
					<p className={classes.hotkey}>Ctrl+S</p>
				</button>
				<button onMouseDown={restoreHandler}>
					<div className={classes.item}>
						<span className="material-icons-outlined">restore</span>
						Restore
					</div>
					<p className={classes.hotkey}>Ctrl+R</p>
				</button>
				<div className={classes.divider} />
				<button onMouseDown={fitViewHandler}>
					<div className={classes.item}>
						<span className="material-icons-outlined">crop_free</span>
						Fit View
					</div>
					<p className={classes.hotkey}>Space</p>
				</button>
				<button onMouseDown={captureHandler}>
					<div className={classes.item}>
						<span className="material-icons-outlined">photo_camera</span>
						Capture
					</div>
					<p className={classes.hotkey}>Ctrl+G</p>
				</button>
				<button onMouseDown={lockHandler}>
					<div className={classes.item}>
						{flowLocked ? <span className="material-icons-outlined">lock</span> : <span className="material-icons-outlined">lock_open</span>}
						{flowLocked ? "Unlock" : "Lock"}
					</div>
					<p className={classes.hotkey}>Ctrl+L</p>
				</button>
				<div className={classes.divider} />
				<button onMouseDown={infoHandler}>
					<div className={classes.item}>
						<span className="material-icons-outlined">info</span>
						Info
					</div>
				</button>
			</div>
		);
	}
);
