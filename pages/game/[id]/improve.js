const ImproveGame = () => {
	return <Game setLoaded={setLoaded} mode={step} project={data} iteration={data.iterations.length - 1} query={data.query} blockList={data.improve.blockList} />;
};

export default ImproveGame;
