import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ModuleContainer from "../UI/ModuleContainer";

import classes from "./Research.module.scss";

import VideoViewer from "../UI/VideoViewer";

const PdfViewer = dynamic(() => import("../UI/PdfViewer"), { ssr: false });

const Research = ({ query, data, caption }) => {
  const [active, setActive] = useState(0);
  const [pdfLoaded, setPdfLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setPdfLoaded(true), [250]);
  }, [active]);

  const cardClickHandler = (i) => {
    setPdfLoaded(false);
    setActive(i);
  };

  return (
    <div className={classes.view}>
      <ModuleContainer
        active={active}
        clickHandler={cardClickHandler}
        modules={data}
        caption={caption}
        play={query}
      />
      <div className={classes.mainContainer}>
        {data[active].type === "pdf" && (
          <div style={{ width: "100%", paddingTop: "10vh" }}>
            <PdfViewer file={data[active].url} />
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
              data[active].items.map((i) => (
                <div className={classes.item}>
                  <VideoViewer
                    data={i}
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
        <div
          className={`${classes.loadScreen} ${pdfLoaded ? classes.loaded : ""}`}
        />
      </div>
    </div>
  );
};

export default Research;
