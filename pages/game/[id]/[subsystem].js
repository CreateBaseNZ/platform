// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import Head from "next/head";
// import useMixpanel from "../../../hooks/useMixpanel";
// import Game from "../../../components/Game/Game";
// import { ALL_PROJECTS_ARRAY } from "../../../utils/getProjectData";
// import LoadingScreen from "../../../components/UI/LoadingScreen";

// const SubsystemGame = () => {
// 	const router = useRouter();
// 	const [data, setData] = useState();
// 	const [subsystemIndex, setSubsystemIndex] = useState(null);
// 	const {} = useMixpanel("code_create_time");

// 	useEffect(() => {
// 		if (!router.isReady) return;
// 		const _data = ALL_PROJECTS_ARRAY.find((project) => project.query === router.query.id);
// 		if (!_data) return void router.replace("/404");

// 		const _subsystemIndex = _data.subsystems.findIndex((subsystem) => subsystem.title === router.query.subsystem);
// 		if (_subsystemIndex < 0) return void router.replace("/404");

// 		setData(_data);
// 		setSubsystemIndex(_subsystemIndex);
// 	}, [router]);

// 	if (!data || subsystemIndex === null) return <LoadingScreen />;

// 	return (
// 		<>
// 			<Head>
// 				<title>
// 					{data.subsystems[subsystemIndex].title} • {data.name} | CreateBase
// 				</title>
// 				<meta name="description" content="CreateBase" />
// 			</Head>
// 			<Game project={data} index={subsystemIndex} query={data.query} blockList={data.subsystems[subsystemIndex].blockList} />
// 		</>
// 	);
// };

// export default SubsystemGame;

// SubsystemGame.auth = "user";
