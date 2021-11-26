import Head from "next/head";
import { useEffect, useState } from "react";
import useClass from "../../../hooks/useClass";
import ProgressTable from "../../../components/Classes/Progress/ProgressTable";
import Select from "../../../components/Classes/Progress/Select";
import InnerLayout from "../../../components/Layouts/InnerLayout/InnerLayout";
import HeaderToggle from "../../../components/Layouts/MainLayout/HeaderToggle";
import MainLayout from "../../../components/Layouts/MainLayout/MainLayout";
import { allData } from "../../../utils/getProjectData";
import CLASSES_TABS, { PROGRESS_VIEW_OPTIONS } from "../../../constants/classesConstants";

import classes from "../../../styles/classesProgress.module.scss";

const printStatus = (status) => {
	switch (status) {
		case "completed":
			return "Completed";
		case "visited":
			return "Visited for ≥ 60 seconds";
		default:
			return "Visited for < 60 seconds";
	}
};

const generateRandom = () => {
	const strings = ["completed", "visited", ""];
	const randomIndex = Math.floor(Math.random() * strings.length);
	let duration;
	if (randomIndex === 0) {
		duration = Math.random() * 600 + 60;
	} else if (randomIndex === 1) {
		duration = Math.random() * 600 + 60;
	} else {
		duration = Math.random() * 60;
	}
	return { duration: duration, status: strings[randomIndex] };
};

const DUMMY_STUDENTS = [
	{
		id: "asldkjfhasasdfd",
		name: "Fruit Burst",
		projects: {
			"heat-seeker": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
					"sub-2": {
						name: "Subsystem 2",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			magnebot: {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			"send-it": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
		},
	},
	{
		id: "sadfsdfsdfsddas",
		name: "Pineapple Lumps",
		projects: {
			"heat-seeker": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
					"sub-2": {
						name: "Subsystem 2",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			magnebot: {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			"send-it": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
		},
	},
	{
		id: "asdf3sdfs454rte",
		name: "Chocolate Fish",
		projects: {
			"heat-seeker": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
					"sub-2": {
						name: "Subsystem 2",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			magnebot: {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			"send-it": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
		},
	},
	{
		id: "asdfasdfv",
		name: "Chocolate Fish",
		projects: {
			"heat-seeker": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
					"sub-2": {
						name: "Subsystem 2",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			magnebot: {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			"send-it": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
		},
	},
	{
		id: "awert34dgg",
		name: "Chocolate Fish",
		projects: {
			"heat-seeker": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
					"sub-2": {
						name: "Subsystem 2",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			magnebot: {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			"send-it": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
		},
	},
	{
		id: "2345dfgd",
		name: "Chocolate Fish",
		projects: {
			"heat-seeker": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
					"sub-2": {
						name: "Subsystem 2",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			magnebot: {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			"send-it": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
		},
	},
	{
		id: "dfg4545sdfg",
		name: "Chocolate Fish",
		projects: {
			"heat-seeker": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
					"sub-2": {
						name: "Subsystem 2",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			magnebot: {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			"send-it": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
		},
	},
	{
		id: "345tert",
		name: "Chocolate Fish",
		projects: {
			"heat-seeker": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
					"sub-2": {
						name: "Subsystem 2",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			magnebot: {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			"send-it": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
		},
	},
	{
		id: "wertewrt34",
		name: "Chocolate Fish",
		projects: {
			"heat-seeker": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
					"sub-2": {
						name: "Subsystem 2",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			magnebot: {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			"send-it": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
		},
	},
	{
		id: "3452etfrsg",
		name: "Chocolate Fish",
		projects: {
			"heat-seeker": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
					"sub-2": {
						name: "Subsystem 2",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			magnebot: {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			"send-it": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
		},
	},
	{
		id: "56u56gertg",
		name: "Chocolate Fish",
		projects: {
			"heat-seeker": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
					"sub-2": {
						name: "Subsystem 2",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			magnebot: {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			"send-it": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
		},
	},
	{
		id: "wertmnfghj",
		name: "Chocolate Fish",
		projects: {
			"heat-seeker": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
					"sub-2": {
						name: "Subsystem 2",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			magnebot: {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			"send-it": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
		},
	},
	{
		id: "se45g5tydfg3",
		name: "Chocolate Fish",
		projects: {
			"heat-seeker": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
					"sub-2": {
						name: "Subsystem 2",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			magnebot: {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			"send-it": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
		},
	},
	{
		id: "345sdfg345",
		name: "Chocolate Fish",
		projects: {
			"heat-seeker": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
					"sub-2": {
						name: "Subsystem 2",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			magnebot: {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			"send-it": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
		},
	},
	{
		id: "erwt546gh",
		name: "Chocolate Fish",
		projects: {
			"heat-seeker": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
					"sub-2": {
						name: "Subsystem 2",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			magnebot: {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			"send-it": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
		},
	},
	{
		id: "4356gdfghsd",
		name: "Chocolate Fish",
		projects: {
			"heat-seeker": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
					"sub-2": {
						name: "Subsystem 2",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			magnebot: {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			"send-it": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
		},
	},
	{
		id: "23234fgsad",
		name: "Chocolate Fish",
		projects: {
			"heat-seeker": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
					"sub-2": {
						name: "Subsystem 2",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			magnebot: {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			"send-it": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
		},
	},
	{
		id: "ertybfsdfaasdfsfwer",
		name: "Chocolate Fish",
		projects: {
			"heat-seeker": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
					"sub-2": {
						name: "Subsystem 2",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			magnebot: {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			"send-it": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
		},
	},
	{
		id: "asdfasdfr3r45",
		name: "Chocolate Fish",
		projects: {
			"heat-seeker": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
					"sub-2": {
						name: "Subsystem 2",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			magnebot: {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			"send-it": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
		},
	},
];
const DUMMY_STUDENTS_1 = [
	{
		id: "asldkjfhasasdfd",
		name: "Jet Planes",
		projects: {
			"heat-seeker": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
					"sub-2": {
						name: "Subsystem 2",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			magnebot: {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			"send-it": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
		},
	},
];
const DUMMY_STUDENTS_2 = [
	{
		id: "asdf6ughd",
		name: "Hokey Pokey",
		projects: {
			"heat-seeker": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
					"sub-2": {
						name: "Subsystem 2",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			magnebot: {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
			"send-it": {
				define: { ...generateRandom() },
				imagine: { ...generateRandom() },
				create: {
					"sub-1": {
						name: "Subsystem 1",
						research: { ...generateRandom() },
						plan: { ...generateRandom() },
						code: { ...generateRandom() },
					},
				},
				improve: { ...generateRandom() },
			},
		},
	},
];

const DUMMY_CLASSES = [
	{ id: "jelly101abc123", name: "Jelly 101", students: DUMMY_STUDENTS },
	{ id: "honey302abc123", name: "Honey 302", students: DUMMY_STUDENTS_1 },
	{ id: "gummy401abc123", name: "Gummy 401", students: DUMMY_STUDENTS_2 },
];

const PROJECT_OPTIONS = allData.map((project) => ({ id: project.query, name: project.name }));

const PROJECT_MAP = PROJECT_OPTIONS.reduce((acc, cur) => ({ ...acc, [cur.id]: cur.name }), {});

const ClassesProgress = () => {
	const { classObject, classLoaded } = useClass();
	const [classSelect, setClassSelect] = useState({ isOpen: false, selected: DUMMY_CLASSES[0] });
	const [viewSelect, setViewSelect] = useState({ isOpen: false, selected: PROGRESS_VIEW_OPTIONS[0] });
	const [studentSelect, setStudentSelect] = useState({ isOpen: false, selected: classSelect.selected.students[0] });
	const [projectSelect, setProjectSelect] = useState({ isOpen: false, selected: PROJECT_OPTIONS[0] });
	const [data, setData] = useState(classSelect.selected.students);
	const [tooltip, setTooltip] = useState();

	useEffect(() => {
		setStudentSelect({ isOpen: false, selected: classSelect.selected.students[0] });
	}, [classSelect.selected]);

	useEffect(() => {
		if (viewSelect.selected.id === "student") {
			setData(Object.keys(studentSelect.selected.projects).map((key) => ({ ...studentSelect.selected.projects[key], id: key, name: PROJECT_MAP[key] })));
		} else {
			setData(classSelect.selected.students.map((student) => ({ ...student.projects[projectSelect.selected.id], id: student.id, name: student.name })));
		}
	}, [viewSelect.selected]);

	useEffect(() => {
		console.log(studentSelect);
		setData(Object.keys(studentSelect.selected.projects).map((key) => ({ ...studentSelect.selected.projects[key], id: key, name: PROJECT_MAP[key] })));
	}, [studentSelect.selected]);

	useEffect(() => {
		setData(classSelect.selected.students.map((student) => ({ ...student.projects[projectSelect.selected.id], id: student.id, name: student.name })));
	}, [projectSelect.selected]);

	if (!classLoaded) return null;

	return (
		<div className={`${classes.view} roundScrollbar`}>
			<Head>
				<title>Progress • {classObject.name} | CreateBase</title>
				<meta name="description" content="View your class announcements" />
			</Head>
			<div className={classes.header}>
				<h1>Progress</h1>
				<Select state={classSelect} setState={setClassSelect} label="Class" options={DUMMY_CLASSES} />
				<Select state={viewSelect} setState={setViewSelect} label="View" options={PROGRESS_VIEW_OPTIONS} width={100} />
				{viewSelect.selected.id === "student" ? (
					<Select state={studentSelect} setState={setStudentSelect} label="Student" options={classSelect.selected.students} width={150} />
				) : (
					<Select state={projectSelect} setState={setProjectSelect} label="Project" options={PROJECT_OPTIONS} width={150} />
				)}
				<HeaderToggle />
			</div>
			<ProgressTable data={data} view={viewSelect.selected} setTooltip={setTooltip} />
			{tooltip && (
				<div className={classes.tooltip} style={{ ...tooltip.position, ...tooltip.style }}>
					<div className={classes.tooltipTitle}>{tooltip.title}</div>
					<div className={classes.tooltipStep}>{tooltip.step}</div>
					<div className={classes[tooltip.status]}>{printStatus(tooltip.status)}</div>
					<div className={classes.tooltipDuration}>
						{Math.floor(tooltip.duration / 3600) ? `${Math.floor(tooltip.duration / 3600)}hr` : ""}{" "}
						{Math.floor((tooltip.duration % 3600) / 60) ? `${Math.floor((tooltip.duration % 3600) / 60)}min` : ""} {Math.floor(tooltip.duration % 60)}s
					</div>
				</div>
			)}
		</div>
	);
};

ClassesProgress.getLayout = function getLayout(page) {
	return (
		<MainLayout page="classes">
			<InnerLayout tabs={CLASSES_TABS} backHref="/classes">
				{page}
			</InnerLayout>
		</MainLayout>
	);
};

ClassesProgress.auth = "user";

export default ClassesProgress;
