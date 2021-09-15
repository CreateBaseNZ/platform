import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
import ModuleContainer from "../UI/ModuleContainer";
import VideoViewer from "../UI/VideoViewer";
import Img from "../UI/Img";

import classes from "./Research.module.scss";

// const PdfViewer = dynamic(() => import("../UI/PdfViewer"), { ssr: false });

const Research = ({ query, data, caption, setLoaded }) => {
	const [active, setActive] = useState(0);

	useEffect(() => {
		setLoaded(true);
	}, []);

	const cardClickHandler = (i) => {
		setActive(i);
	};

	return (
		<div className={classes.view}>
			<ModuleContainer active={active} clickHandler={cardClickHandler} modules={data} caption={caption} play={query} />
			<div className={classes.mainContainer}>
				{data[active].type === "pdf" && (
					<div style={{ width: "100%", height: "100%" }}>
						{/* <PdfViewer file={data[active].url} /> */}
						<embed src={data[active].url} width="100%" height="100%" />
					</div>
				)}
				{data[active].type === "video" && (
					<div style={{ width: "85%" }}>
						<VideoViewer data={data[active].data} />
					</div>
				)}
				{data[active].type === "tut" && (
					<div className={`${classes.tutWrapper} roundScrollbar`}>
						{data[active].items &&
							data[active].items.map((d, i) => (
								<div key={i} className={classes.item}>
									<VideoViewer
										data={d}
										attributes={{
											autoPlay: true,
											loop: true,
											muted: true,
											allow: "autoplay",
										}}
										controls={false}
										captionClass={classes.caption}
									/>
								</div>
							))}
					</div>
				)}
				{data[active].type === "explore" && (
					<div className={classes.exploreWrapper}>
						{data[active] &&
							data[active].items.map((item, i) => (
								<a key={i} href={item.url} target="_blank" className={classes.exploreItem} title={`Launch ${item.title}`}>
									<div
										className={classes.imgContainer}
										style={{
											background: `linear-gradient(to bottom right, ${item.col1}, ${item.col2})`,
										}}>
										<div className={classes.imgWrapper}>
											<Img src={item.img} layout="fill" objectFit="cover" />
										</div>
										<span className="material-icons-outlined">launch</span>
										<h3>{item.title}</h3>
									</div>
									<div className={classes.caption}>{item.caption}</div>
								</a>
							))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Research;
