import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import classes from "./Define.module.scss";
import ModuleContainer from "../UI/ModuleContainer";

const PdfViewer = dynamic(() => import("../UI/PdfViewer"), { ssr: false });

const Define = ({ data, caption }) => {
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
      />
      <div className={classes.mainContainer}>
        <PdfViewer file={data[active].url} />
        <div
          className={`${classes.loadScreen} ${pdfLoaded ? classes.loaded : ""}`}
        />
      </div>
    </div>
  );
};

export default Define;
