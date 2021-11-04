import { useContext, useMemo, useState, useEffect, useRef } from "react";
import router from "next/router";
import Head from "next/head";
import axios from "axios";
import useHandleResponse from "../../hooks/useHandleResponse";
import MainLayoutContext from "../../store/main-layout-context";
import GlobalSessionContext from "../../store/global-session-context";
import Table from "./Table";
import { COLUMNS, SIZES } from "../../constants/manageGroup";

import classes from "/styles/manageGroup.module.scss";

const ManageGroup = ({ role }) => {
	const ref = useRef();
	const { globalSession } = useContext(GlobalSessionContext);
	const { handleResponse } = useHandleResponse();
	const { headerIsCollapsed, setHeaderIsCollapsed } = useContext(MainLayoutContext);
	const [data, setData] = useState([]);

	useEffect(async () => {
		const DUMMY_STATUS = "succeeded";
		// profileId is optional to double check user has admin privileges to access
		const details = { profileId: globalSession.profileId, schoolId: globalSession.groups[globalSession.recentGroups[0]].id };
		let data = {};
		try {
			data = (await axios.post("/api/groups/fetch-users", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: details, status: DUMMY_STATUS }))["data"];
		} catch (error) {
			data.status = "error";
		} finally {
			handleResponse({
				data,
				failHandler: () => {
					if (data.content === "unauthorised") {
						router.replace("/404");
					}
				},
				successHandler: () => ref.current && setData(data.content.filter((user) => user.role === role)),
			});
		}
	}, []);

	useEffect(() => (ref.current = null), []);

	if (!role) {
		router.replace("/manage-group/students");
		return null;
	}

	return (
		<div className={classes.manageGroup}>
			<Head>
				<title>
					Manage {role}s • {globalSession.groups[globalSession.recentGroups[0]].name} | CreateBase
				</title>
				<meta name="description" content="Log into your CreateBase account" />
			</Head>
			<h2 ref={ref} className={classes.header}>
				Manage {role}s
				<button className={classes.toggleHeader} onClick={() => setHeaderIsCollapsed((state) => !state)} title="Expand table view">
					<span>{headerIsCollapsed ? "Collapse" : "Expand"}</span>
					<i className="material-icons-outlined" style={{ transform: headerIsCollapsed && "rotate(180deg)" }}>
						expand_less
					</i>
				</button>
			</h2>
			<Table columns={COLUMNS} data={data} pageSizes={SIZES} />
		</div>
	);
};

export default ManageGroup;
