import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import classes from "./Define.module.scss";
import { PdfViewerAll } from "../UI/PdfViewer";
import ModuleContainer from "./ModuleContainer";

const PdfViewer = dynamic(() => import("../UI/PdfViewer"), { ssr: false });

const Define = ({ query, data, caption }) => {
  const [active, setActive] = useState(0);
  const [numPages, setNumPages] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [pdfLoaded, setPdfLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setPdfLoaded(true), [500]);
  }, [active]);

  const cardClickHandler = (i) => {
    setPdfLoaded(false);
    setActive(i);
  };

  const onLoadSuccessHandler = ({ numPages }) => {
    setNumPages(numPages);
  };

  const prevPage = () => {
    setPageNum((state) => state - 1);
  };

  const nextPage = () => {
    setPageNum((state) => state + 1);
  };

  return (
    <div className={classes.view}>
      <ModuleContainer
        active={active}
        clickHandler={cardClickHandler}
        modules={data}
        query={query}
        images={true}
        caption={caption}
      />
      <div className={classes.mainContainer}>
        <div className={classes.pdfContainer}>
          <div className={classes.pdfWrapper}>
            <PdfViewer
              file={`/${query}/pdf/${data[active].id}.pdf`}
              pageNum={pageNum}
              onLoadSuccessHandler={onLoadSuccessHandler}
            />
            <div className={classes.pdfNav}>
              <a
                href="/intro-to-flow.pdf"
                title="Download"
                download
                className={classes.download}
              >
                <span className="material-icons-outlined">file_download</span>
                Download
              </a>
              <button
                disabled={pageNum <= 1}
                onClick={prevPage}
                title="Previous page"
              >
                <span className="material-icons-outlined">arrow_back_ios</span>
              </button>
              <p>{pageNum || (numPages ? 1 : "--")}</p>
              <button
                disabled={pageNum >= numPages}
                onClick={nextPage}
                title="Next page"
              >
                <span className="material-icons-outlined">
                  arrow_forward_ios
                </span>
              </button>
              <a
                href="/intro-to-flow.pdf"
                target="_blank"
                title="Open in new tab"
                className={classes.launch}
              >
                Open in tab
                <span className="material-icons-outlined">launch</span>
              </a>
            </div>
          </div>
          <div className={classes.tocWrapper}>
            <PdfViewerAll
              file={`/${query}/pdf/${data[active].id}.pdf`}
              numPages={numPages}
              pageNum={pageNum}
              setPageNum={setPageNum}
            />
          </div>
        </div>
        <div
          className={`${classes.loadScreen} ${pdfLoaded ? classes.loaded : ""}`}
        />
      </div>
    </div>
  );
};

// const Define = ({ query }) => {
//   const [activePrompt, setActivePrompt] = useState();

//   const closeHandler = () => {
//     setActivePrompt(null);
//   };

//   const openPrompt = (prompt) => {
//     let modal;
//     switch (prompt) {
//       case "send-it__delivery":
//         modal = <Delivery closeHandler={closeHandler} query={query} />;
//         break;
//       case "send-it__mail":
//         modal = <Mail closeHandler={closeHandler} query={query} />;
//         break;
//       case "send-it__controlling":
//         modal = <Controlling closeHandler={closeHandler} query={query} />;
//         break;
//       case "send-it__ethics":
//         modal = <Ethics closeHandler={closeHandler} query={query} />;
//         break;
//     }
//     setActivePrompt(<Modal children={modal} closeHandler={closeHandler} />);
//   };

//   return (
//     <section id="define">
//       {activePrompt}
//       <div className={classes.wrapper}>
//         <h2>Define</h2>
//         {query === "send-it" && (
//           <>
//             <div className={classes.moduleContainer}>
//               <InfoModule onClick={openPrompt.bind(this, "send-it__delivery")}>
//                 Types of <span>Delivery</span> Robots
//               </InfoModule>
//               <InfoModule onClick={openPrompt.bind(this, "send-it__mail")}>
//                 Delivering <span>Mail</span>
//               </InfoModule>
//               <InfoModule
//                 onClick={openPrompt.bind(this, "send-it__controlling")}
//               >
//                 <span>Controlling</span> a Robot
//               </InfoModule>
//               <InfoModule onClick={openPrompt.bind(this, "send-it__ethics")}>
//                 The <span>Ethics</span> of Automation
//               </InfoModule>
//             </div>
//             <p className={classes.description}>
//               Explore the advantages and disadvantages of automation and AI by
//               discussing the questions in ONE of these cards with your group.
//               Make sure to write your answers in your own learning journal. If
//               your group finishes early, feel free to try complete a second card
//               as well!
//             </p>
//             <p className={classes.description}>
//               When every group has finished, your teacher will call you back to
//               discuss your answers and narrow in on the problem that you will be
//               solving.
//             </p>
//           </>
//         )}
//         {query === "magnebot" && (
//           <>
//           <p className={classes.description}>As a class, dive into group discussions around the Project theme to fully define our problem.</p>
//           <p className={classes.description}>Don't have a teacher to guide you through? Check back soon for individual content!</p>
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

export default Define;
