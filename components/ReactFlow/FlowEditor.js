import React, { useRef, useState, useCallback, useEffect, memo, useContext } from "react";
import ReactFlow, { removeElements, addEdge, updateEdge, Background, isEdge, isNode, useZoomPanHelper, useStoreState, useStoreActions } from "react-flow-renderer";
import { nodeTypes, edgeTypes, tooltips, controlTitles, initialElements } from "../../utils/flowConfig";
import {
	flashLockIcon,
	getDefaultValues,
	getHandleObject,
	getNearestGridPosition,
	infoLogs,
	newConnection,
	nodeTypeHandles,
	removeConnection,
	saveAs,
	updateConnections,
} from "../../utils/flowHelpers";
import html2canvas from "html2canvas";

import DndBar from "./DndBar";
import ControlsBar from "./ControlsBar";

import classes from "./FlowEditor.module.scss";
import MiniHoverContext from "../../store/mini-hover-context";
import { NodeContextMenu, PaneContextMenu } from "./FlowContextMenu";
import ConsoleContext from "../../store/console-context";

import ClientOnlyPortal from "../UI/ClientOnlyPortal";
import FlowVisualBell from "./FlowVisualBell";
import useApi from "../../hooks/useApi";
import GlobalSessionContext from "../../store/global-session-context";

let id = 0;
const getId = () => `dndnode_${id++}`;

const FlowEditor = ({ saveName, blockList, show, frozen = false, elements, setElements, flowVisualBell, setFlowVisualBell }) => {
	const wrapperRef = useRef(null);
	const consoleCtx = useContext(ConsoleContext);
	const miniHoverCtx = useContext(MiniHoverContext);
	const [reactFlowInstance, setReactFlowInstance] = useState({});
	const [actionStack, setActionStack] = useState({
		stack: [],
		currentIndex: -1,
	});
	const [systemAction, setSystemAction] = useState(false);
	const [clipBoard, setClipBoard] = useState();
	const [flowLocked, setFlowLocked] = useState(frozen);
	const [nodeCtxMenu, setNodeCtxMenu] = useState({
		show: false,
		x: 0,
		y: 0,
		node: null,
	});
	const [paneCtxMenu, setPaneCtxMenu] = useState({
		show: false,
		x: 0,
		y: 0,
	});
	const [edgeMove, setEdgeMove] = useState(false);
	const { zoomIn, zoomOut, setCenter } = useZoomPanHelper();
	const setSelectedElements = useStoreActions((actions) => actions.setSelectedElements);
	const selectedElements = useStoreState((store) => store.selectedElements);
	const [x, y, zoom] = useStoreState((state) => state.transform);
	const { post } = useApi();
	const { globalSession } = useContext(GlobalSessionContext);

	const allowUndo = actionStack.currentIndex !== 0;
	const allowRedo = actionStack.currentIndex + 1 !== actionStack.stack.length;

	useEffect(() => {
		if (!systemAction) {
			setActionStack((state) => {
				return {
					stack: [...state.stack.slice(0, state.currentIndex + 1), elements],
					currentIndex: state.currentIndex + 1,
				};
			});
		} else {
			setSystemAction(false);
		}
	}, [elements]);

	useEffect(() => {
		if (clipBoard && clipBoard.length) {
			setFlowVisualBell((state) => ({
				message: "Copied to clipboard",
				switch: !state.switch,
				show: true,
			}));
		}
	}, [clipBoard]);

	useEffect(() => {
		if (edgeMove.move) {
			let dx = 0;
			let dy = 0;
			if (edgeMove.up) {
				dy = 4;
			} else if (edgeMove.down) {
				dy = -4;
			}
			if (edgeMove.left) {
				dx = 4;
			} else if (edgeMove.right) {
				dx = -4;
			}
			setTimeout(() => {
				reactFlowInstance.setTransform({ x: x + dx, y: y + dy, zoom: zoom });
			}, [1]);
		}
	}, [edgeMove, reactFlowInstance.setTransform, x, y]);

	// initialising flow editor
	const onLoad = useCallback(async (_reactFlowInstance) => {
		console.log("flow loaded:", _reactFlowInstance);
		window.requestAnimationFrame(_reactFlowInstance.fitView);
		setReactFlowInstance(_reactFlowInstance);
		await post({
			route: "/api/profile/read-saves",
			input: { profileId: globalSession.profileId, properties: [saveName] },
			successHandler: (data) => data.content[saveName] && setElements(JSON.parse(data.content[saveName])),
		});
		const controls = document.querySelector(".react-flow__controls").children;
		for (let i = 0; i < controls.length; i++) {
			controls[i].title = controlTitles[i];
		}
		const arrow = document.querySelector("#react-flow__arrowclosed");
		const clone = arrow.cloneNode(true);
		clone.id = "react-flow__arrowclosed__custom";
		arrow.parentNode.appendChild(clone);
		document.querySelector(".react-flow").focus();
		// window.onbeforeunload = (e) => {
		//   if (!frozen) {
		//     e.preventDefault();
		//     return (e.returnValue =
		//       "You have unsaved changes, are you sure you want to exit?");
		//   }
		// };
	}, []);

	// deleting an element
	const onElementsRemove = useCallback((elementsToRemove) => {
		console.log(elementsToRemove);
		let edges = [];
		const filteredElements = elementsToRemove.filter((el) => {
			if (isEdge(el)) {
				edges.push(el);
			}
			if (el.id === "start") {
				setFlowVisualBell((state) => ({
					message: "Cannot delete Start block",
					switch: !state.switch,
					show: true,
				}));
				return false;
			}
			return true;
		});
		setElements((els) =>
			removeElements(filteredElements, els).map((el) => {
				console.log(el);
				for (const edge of edges) {
					console.log(edge);
					if (el.id === edge.source) {
						return removeConnection(el, edge.sourceHandle);
					} else if (el.id === edge.target) {
						return removeConnection(el, edge.targetHandle);
					}
				}
				return el;
			})
		);
	}, []);

	const onConnect = useCallback((params) => {
		// styling new edge
		const newEdge = getHandleObject(params.sourceHandle.split("__")[0], params);
		setElements((els) => newConnection(addEdge(newEdge, els), params));
	}, []);

	// updating edges
	const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
		setElements((els) => updateConnections(updateEdge(oldEdge, newConnection, els), oldEdge, newConnection));
	}, []);

	// dragging from menu to drop zone
	const onDragOver = (event) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	};

	// dropping
	const onDrop = (event) => {
		event.preventDefault();
		if (flowLocked) {
			flashLockIcon();
			setFlowVisualBell((state) => ({
				message: "Flow is locked",
				switch: !state.switch,
				show: true,
			}));
			return;
		}
		// place the node in correct position
		const reactFlowBounds = wrapperRef.current.getBoundingClientRect();
		const type = event.dataTransfer.getData("application/reactflow");
		const position = reactFlowInstance.project({
			x: event.clientX - reactFlowBounds.left,
			y: event.clientY - reactFlowBounds.top,
		});
		// create new node
		const newId = getId();
		const newNode = {
			id: newId,
			type,
			position,
			data: {
				values: getDefaultValues(type),
				connections: [],
				callBack: (newValues, thisId) => {
					setElements((els) =>
						els.map((el) => {
							if (el.id === thisId) {
								el.data = {
									...el.data,
									values: newValues,
								};
							}
							return el;
						})
					);
				},
			},
		};
		if (event.target.classList.contains("react-flow__handle") && event.target.classList.contains("connectable")) {
			autoConnect(event, type, newNode, newId);
		} else {
			setElements((els) => els.concat(newNode));
		}
	};

	const autoConnect = (event, type, newNode, id) => {
		const handles = nodeTypeHandles[type];
		const [droppedHandleType, droppedHandleDir] = event.target.dataset.handleid.split("__").slice(0, 2);
		for (const h of handles) {
			if (h.split("__")[0] === droppedHandleType && h.split("__")[1] !== droppedHandleDir) {
				let sourceId, targetId, sourceHandle, targetHandle, dx, dy;
				if (droppedHandleDir === "in") {
					targetId = event.target.dataset.nodeid;
					targetHandle = event.target.dataset.handleid;
					sourceId = id;
					sourceHandle = h;
					dx = -176;
					dy = -80;
				} else {
					targetId = id;
					targetHandle = h;
					sourceId = event.target.dataset.nodeid;
					sourceHandle = event.target.dataset.handleid;
					dx = 32;
					dy = 16;
				}
				newNode.data.connections.push(h);
				newNode.position.x += dx;
				newNode.position.y += dy;

				setElements((els) =>
					els
						.map((_el) =>
							_el.id === event.target.dataset.nodeid
								? {
										..._el,
										data: {
											..._el.data,
											connections: _el.data.connections.concat(event.target.dataset.handleid),
										},
								  }
								: _el
						)
						.concat(newNode)
						.concat(
							getHandleObject(droppedHandleType, {
								id: `reactflow__edge-${sourceId}${sourceHandle}-${targetId}${targetHandle}`,
								source: sourceId,
								sourceHandle: sourceHandle,
								target: targetId,
								targetHandle: targetHandle,
								type: droppedHandleType,
							})
						)
				);

				return setFlowVisualBell((state) => ({
					message: "Blocks autoconnected",
					switch: !state.switch,
					show: true,
				}));
			}
		}
	};

	const copySelection = (selection) => {
		if (selection) {
			setClipBoard(selection.filter((el) => el.id !== "start"));
		} else if (selectedElements) {
			setClipBoard(selectedElements.filter((el) => el.id !== "start"));
		}
	};

	const pasteSelection = (x, y) => {
		if (flowLocked) {
			flashLockIcon();
			setFlowVisualBell((state) => ({
				message: "Flow is locked",
				switch: !state.switch,
				show: true,
			}));
			return;
		}
		if (clipBoard && clipBoard.length) {
			let xDiff = 0;
			let yDiff = 0;
			if (x && y) {
				const reactFlowBounds = wrapperRef.current.getBoundingClientRect();
				const position = reactFlowInstance.project({
					x: x - reactFlowBounds.left,
					y: y - reactFlowBounds.top,
				});
				console.log(x);
				console.log(y);
				let allX = [];
				let allY = [];
				clipBoard
					.filter((el) => isNode(el))
					.map((el) => {
						allX.push(el.position.x);
						allY.push(el.position.y);
					});
				xDiff = position.x - Math.min(...allX);
				yDiff = position.y - Math.min(...allY);
			}

			let mapping = {};
			let edges = [];
			for (const el of clipBoard) {
				if (isNode(el)) {
					const newId = getId();
					mapping[el.id] = {
						id: newId,
						type: el.type,
						position: { x: el.position.x + xDiff, y: el.position.y + yDiff },
						data: { ...el.data, connections: [] },
					};
				} else {
					edges.push(el);
				}
			}

			const newEdges = edges
				.filter((edge) => edge.source in mapping && edge.target in mapping)
				.map((edge) => {
					mapping[edge.source].data.connections.push(edge.sourceHandle);
					mapping[edge.target].data.connections.push(edge.targetHandle);
					return {
						...edge,
						id: `reactflow__edge-${mapping[edge.source].id}${edge.sourceHandle}-${mapping[edge.target].id}${edge.targetHandle}`,
						source: mapping[edge.source].id,
						target: mapping[edge.target].id,
					};
				});

			const newNodes = Object.keys(mapping).map((key) => mapping[key]);
			console.log(newNodes);
			const newEls = newNodes.concat(newEdges);
			setElements((els) => els.concat(newEls));
			setSelectedElements(newEls);
			setFlowVisualBell((state) => ({
				message: "Code pasted",
				switch: !state.switch,
				show: true,
			}));
		} else {
			setFlowVisualBell((state) => ({
				message: "Nothing on clipboard",
				switch: !state.switch,
				show: true,
			}));
		}
	};

	const undoAction = () => {
		if (flowLocked) {
			flashLockIcon();
			setFlowVisualBell((state) => ({
				message: "Flow is locked",
				switch: !state.switch,
				show: true,
			}));
			return;
		}
		if (allowUndo) {
			setSystemAction(true);
			setElements(actionStack.stack[actionStack.currentIndex - 1]);
			setActionStack((state) => {
				return { ...state, currentIndex: state.currentIndex - 1 };
			});
		}
	};

	const redoAction = () => {
		if (flowLocked) {
			flashLockIcon();
			setFlowVisualBell((state) => ({
				message: "Flow is locked",
				switch: !state.switch,
				show: true,
			}));
			return;
		}
		if (allowRedo) {
			setSystemAction(true);
			setElements(actionStack.stack[actionStack.currentIndex + 1]);
			setActionStack((state) => {
				return { ...state, currentIndex: state.currentIndex + 1 };
			});
		}
	};

	const saveFlow = async () => {
		console.log(elements);
		if (elements.length > 1) {
			await post({
				route: "/api/profile/update-saves",
				input: { profileId: globalSession.profileId, update: { [saveName]: JSON.stringify(elements) }, date: new Date().toString() },
				successHandler: () => {
					setFlowVisualBell((state) => ({
						message: "Code saved",
						switch: !state.switch,
						show: true,
					}));
				},
			});
		}
	};

	const restoreFlow = async () => {
		if (flowLocked) {
			flashLockIcon();
			setFlowVisualBell((state) => ({
				message: "Flow is locked",
				switch: !state.switch,
				show: true,
			}));
			return;
		}
		let savedEls;
		await post({
			route: "/api/profile/read-saves",
			input: { profileId: globalSession.profileId, properties: [saveName] },
			successHandler: (data) => data.content[saveName] && (savedEls = JSON.parse(data.content[saveName])),
		});
		if (savedEls) {
			const restoredEls = savedEls.map((savedEl) => {
				if (isNode(savedEl)) {
					const idNum = parseInt(savedEl.id.split("_")[1]);
					if (!isNaN(idNum) && idNum >= id) {
						id = idNum + 1;
					}
					return {
						...savedEl,
						data: {
							...savedEl.data,
							callBack: (newValues, thisId) => {
								setElements((els) =>
									els.map((thisEl) => {
										if (thisEl.id === thisId) {
											thisEl.data = {
												...thisEl.data,
												values: newValues,
											};
										}
										return thisEl;
									})
								);
							},
						},
					};
				} else {
					return savedEl;
				}
			});
			setElements(restoredEls);
			setCenter(0, 0, 1.25);
			setFlowVisualBell((state) => ({
				message: "Restored from last save",
				switch: !state.switch,
				show: true,
			}));
		}
	};

	const lockHandler = () => {
		setFlowLocked((state) => !state);
	};

	const fitView = () => {
		reactFlowInstance.fitView();
	};

	const clearAll = () => {
		setElements(initialElements);
	};

	const selectAll = () => {
		setSelectedElements(elements);
	};

	const capture = () => {
		html2canvas(document.querySelector(".react-flow__renderer")).then((canvas) => {
			saveAs(canvas.toDataURL(), "my-flow-code.png");
		});
	};

	const keyDownHandler = (event) => {
		if (frozen) {
			return;
		}
		if (event.ctrlKey || event.metaKey) {
			if (event.key === "c") {
				event.preventDefault();
				copySelection();
			} else if (event.key === "v") {
				event.preventDefault();
				pasteSelection();
			} else if (event.key === "z") {
				event.preventDefault();
				undoAction();
			} else if (event.key === "y") {
				event.preventDefault();
				redoAction();
			} else if (event.key === "s") {
				event.preventDefault();
				saveFlow();
			} else if (event.key === "r") {
				event.preventDefault();
				restoreFlow();
			} else if (event.key === "=") {
				event.preventDefault();
				zoomIn();
			} else if (event.key === "-") {
				event.preventDefault();
				zoomOut();
			} else if (event.key === "l") {
				event.preventDefault();
				lockHandler();
			} else if (event.key === "b") {
				event.preventDefault();
				clearAll();
			} else if (event.key === "a") {
				event.preventDefault();
				selectAll();
			}
		} else if (event.key === " ") {
			event.preventDefault();
			fitView();
		}
	};

	const edgeUpdateEndHandler = (event, edge) => {
		if (!event.target.classList.contains("react-flow__handle")) {
			setElements((els) =>
				removeElements([edge], els).map((el) => {
					if (el.id === edge.target) {
						return removeConnection(el, edge.targetHandle);
					} else if (el.id === edge.source) {
						return removeConnection(el, edge.sourceHandle);
					} else {
						return el;
					}
				})
			);
		}
	};

	const nodeDragHandler = (e, node) => {
		let newState = {
			move: false,
			up: false,
			down: false,
			left: false,
			right: false,
		};
		const editorTop = wrapperRef.current.getBoundingClientRect().top;
		const editorLeft = wrapperRef.current.getBoundingClientRect().left;
		if (e.clientY < editorTop + 16) {
			newState.move = true;
			newState.up = true;
		} else if (e.clientY > editorTop + wrapperRef.current.offsetHeight - 16) {
			newState.move = true;
			newState.down = true;
		}
		if (e.clientX < editorLeft + 16) {
			newState.move = true;
			newState.left = true;
		} else if (e.clientX > editorLeft + wrapperRef.current.offsetWidth - 16) {
			newState.move = true;
			newState.right = true;
		}
		setEdgeMove(newState);
	};

	const nodeDragStopHandler = (e, node) => {
		setEdgeMove({ move: false });
		setElements((els) => els.map((el) => (el.id === node.id ? node : el)));
	};

	const selectionDragStopHandler = (_, selectionNodes) => {
		setElements((els) => {
			return els.map((el) => {
				for (const node of selectionNodes) {
					if (node.id === el.id) {
						return {
							id: el.id,
							type: el.type,
							position: {
								x: getNearestGridPosition(node.position.x),
								y: getNearestGridPosition(node.position.y),
							},
							data: el.data,
						};
					}
				}
				return el;
			});
		});
	};

	const infoHandler = () => {
		infoLogs.map((t) => consoleCtx.addLog(t));
	};

	const nodeCtxMenuHandler = (e, node) => {
		e.preventDefault();
		console.log(node);
		setNodeCtxMenu({ show: true, x: e.clientX, y: e.clientY, node: node });
	};

	const nodeCtxBlurHandler = () => {
		setNodeCtxMenu((state) => ({ ...state, show: false }));
	};

	const paneCtxMenuHandler = (e, node) => {
		e.preventDefault();
		setPaneCtxMenu({ show: true, x: e.clientX, y: e.clientY });
	};

	const paneCtxBlurHandler = () => {
		setPaneCtxMenu((state) => ({ ...state, show: false }));
	};

	const touchHandler = () => {
		setFlowVisualBell((state) => ({
			message: "WARNING: Sorry, touch interaction is not yet supported",
			switch: !state.switch,
			show: true,
		}));
	};

	return (
		<div className={`${classes.editorContainer} ${show ? "" : "hide"}`} onKeyDown={keyDownHandler} tabIndex={-1} onTouchStart={touchHandler}>
			{!frozen && <DndBar blockList={blockList} />}
			<div className={classes.editorWrapper} ref={wrapperRef}>
				<ReactFlow
					onLoad={onLoad}
					elements={elements}
					elementsSelectable={!flowLocked}
					nodesConnectable={!flowLocked}
					nodesDraggable={!flowLocked}
					nodeTypes={nodeTypes}
					edgeTypes={edgeTypes}
					maxZoom={3}
					defaultZoom={1.5}
					minZoom={0.25}
					snapToGrid={true}
					snapGrid={[16, 16]}
					arrowHeadColor="#ffffff"
					// deleteKeyCode={["Backspace", "Delete"]}
					multiSelectionKeyCode={"Control"}
					onDrop={onDrop}
					onDragOver={onDragOver}
					onConnect={onConnect}
					onEdgeUpdate={onEdgeUpdate}
					onElementsRemove={onElementsRemove}
					onNodeDrag={nodeDragHandler}
					onNodeDragStop={nodeDragStopHandler}
					onEdgeUpdateEnd={edgeUpdateEndHandler}
					onSelectionDragStop={selectionDragStopHandler}
					onNodeContextMenu={nodeCtxMenuHandler}
					onPaneContextMenu={paneCtxMenuHandler}>
					<ControlsBar
						frozen={frozen}
						undoHandler={undoAction}
						redoHandler={redoAction}
						saveHandler={saveFlow}
						restoreHandler={restoreFlow}
						allowUndo={allowUndo}
						allowRedo={allowRedo}
						flowLocked={flowLocked}
						lockHandler={lockHandler}
						clearAll={clearAll}
						selectAll={selectAll}
						capture={capture}
						info={infoHandler}
					/>
					<Background color="#aaa" gap={16} />
				</ReactFlow>
				{miniHoverCtx.activeNode && (
					<div className={classes.hoverBg}>
						{miniHoverCtx.activeNode.block}
						<aside>
							<p>
								<span className={classes.label}>Inputs:</span>
								{tooltips[miniHoverCtx.activeNode.nodeType][0]}
							</p>
							<p>
								<span className={classes.label}>Outputs:</span>
								{tooltips[miniHoverCtx.activeNode.nodeType][1]}
							</p>
							<p style={{ marginTop: 12 }}>{tooltips[miniHoverCtx.activeNode.nodeType][2]}</p>
						</aside>
					</div>
				)}
				<FlowVisualBell show={flowVisualBell.show} message={flowVisualBell.message} />
			</div>
			<ClientOnlyPortal selector="#modal-root">
				<NodeContextMenu
					show={nodeCtxMenu.show}
					x={nodeCtxMenu.x}
					y={nodeCtxMenu.y}
					node={nodeCtxMenu.node}
					elements={elements}
					blurHandler={nodeCtxBlurHandler}
					selectHandler={setSelectedElements}
					copyHandler={copySelection}
					deleteHandler={onElementsRemove}
					selectAllHandler={selectAll}
					clearAllHandler={clearAll}
				/>
			</ClientOnlyPortal>
			<ClientOnlyPortal selector="#modal-root">
				<PaneContextMenu
					show={paneCtxMenu.show}
					x={paneCtxMenu.x}
					y={paneCtxMenu.y}
					allowUndo={allowUndo}
					allowRedo={allowRedo}
					flowLocked={flowLocked}
					blurHandler={paneCtxBlurHandler}
					pasteHandler={pasteSelection}
					undoHandler={undoAction}
					redoHandler={redoAction}
					saveHandler={saveFlow}
					restoreHandler={restoreFlow}
					fitViewHandler={fitView}
					captureHandler={capture}
					lockHandler={lockHandler}
					infoHandler={infoHandler}
				/>
			</ClientOnlyPortal>
		</div>
	);
};

export default memo(FlowEditor);
