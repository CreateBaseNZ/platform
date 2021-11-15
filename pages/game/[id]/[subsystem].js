const SubsystemGame = () => {
	return <Code setLoaded={setLoaded} mode={step} project={data} iteration={iteration} query={data.query} blockList={data.iterations[iteration].blockList} />;
};

export default SubsystemGame;
