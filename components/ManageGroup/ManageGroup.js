import { useContext, useState, useEffect, useRef } from "react";
import router from "next/router";
import Head from "next/head";
import axios from "axios";
import useHandleResponse from "../../hooks/useHandleResponse";
import GlobalSessionContext from "../../store/global-session-context";
import Table from "../UI/Table/Table";
import { COLUMNS, SIZES } from "../../constants/manageGroup";

import classes from "/styles/manageGroup.module.scss";
import HeaderToggle from "../Layouts/MainLayout/HeaderToggle";

const ManageGroup = ({ role }) => {
	const ref = useRef();
	const { globalSession } = useContext(GlobalSessionContext);
	const { handleResponse } = useHandleResponse();
	const [data, setData] = useState([]);

	useEffect(async () => {
		const details = {
			licenseId: globalSession.groups[globalSession.recentGroups[0]].licenseId,
			schoolId: globalSession.groups[globalSession.recentGroups[0]].id,
		};
		let data = {};
		const DUMMY_STATUS = "succeeded";
		try {
			data = (await axios.post("/api/groups/fetch-users", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: details, status: DUMMY_STATUS }))["data"];
		} catch (error) {
			data.status = "error";
		} finally {
			console.log(data);
			console.log(ref.current);
			handleResponse({
				data,
				failHandler: () => {
					if (data.content === "unauthorised") {
						router.replace("/404");
					}
				},
				successHandler: () => ref.current && setData(data.content.filter((user) => user.role === role && user.status !== "deactivated")),
			});
		}
		() => (ref.current = null);
	}, []);

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
				<HeaderToggle />
			</h2>
			<Table columns={COLUMNS} data={data} pageSizes={SIZES} />
		</div>
	);
};

export default ManageGroup;
