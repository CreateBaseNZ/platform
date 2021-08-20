import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ModuleContainer from "./ModuleContainer";
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import classes from "./Research.module.scss";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import VideoViewer from "../UI/VideoViewer";

const PdfViewer = dynamic(() => import("../UI/PdfViewer"), { ssr: false });

SwiperCore.use([Pagination]);

const renderBullet = (index, className) => {
  return `<span className="${className}"></span>`;
};

const swiperOptions = {
  observer: true,
  observeParents: true,
  pagination: {
    type: "bullets",
    el: `.${classes.pagination}`,
    bulletClass: classes.bullet,
    bulletActiveClass: classes.bulletActive,
    renderBullet: renderBullet,
    clickable: true,
  },
};

const renderSwiperSlide = (caption, i, query) => {
  return (
    <SwiperSlide key={i} className={classes.howToSlide}>
      <div className={classes.slideVideoWrapper}>
        <video autoPlay={true} loop={true} muted={true} allow="autoplay">
          <source
            src={`/${query}/tutorial/vid-${i + 1}.mp4`}
            type="video/mp4"
          />
        </video>
      </div>
      <div className={classes.howToCaption}>
        {caption.map((x, i) => (
          <span key={i}>{x}</span>
        ))}
      </div>
    </SwiperSlide>
  );
};

// const HowTo = ({ closeHandler, query, subtitles }) => {
//   return (
//     <div className={classes.howTo}>
//       <button className={classes.howToClose} onClick={closeHandler}>
//         <CloseIcon />
//       </button>
//       <Swiper {...swiperOptions} className={classes.howToContainer}>
//         {subtitles.map((caption, i) => renderSwiperSlide(caption, i, query))}
//       </Swiper>
//       <div className={classes.pagination}></div>
//     </div>
//   );
// };

// const FlowTutorial = ({ closeHandler }) => {
//   return (
//     <div className={classes.situation}>
//       <button className={classes.situationClose} onClick={closeHandler}>
//         <CloseIcon />
//       </button>
//       <video controls>
//         <source src="/flow-tut.mp4" type="video/mp4" />
//       </video>
//     </div>
//   );
// };

// const Situation = ({ query, closeHandler }) => {
//   return (
//     <div className={classes.situation}>
//       <button className={classes.situationClose} onClick={closeHandler}>
//         <CloseIcon />
//       </button>
//       <video controls>
//         <source src={`/${query}/vid/situation.mp4`} type="video/mp4" />
//       </video>
//     </div>
//   );
// };

const Research = ({ data, caption }) => {
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
          <div className={classes.tutWrapper}>
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

// const Research = ({ query }) => {
//   const [activeModal, setActiveModal] = useState();

//   const closeModalHandler = () => {
//     setActiveModal(null);
//   };

//   const openModal = (id, subtitles) => {
//     let modal;
//     switch (id) {
//       case "how-to":
//         modal = (
//           <HowTo
//             query={query}
//             subtitles={subtitles}
//             closeHandler={closeModalHandler}
//           />
//         );
//         break;
//       case "situation":
//         modal = <Situation closeHandler={closeModalHandler} />;
//         break;
//       case "flow-tut":
//         modal = <FlowTutorial closeHandler={closeModalHandler} />;
//         break;
//       default:
//         return;
//     }
//     setActiveModal(<Modal children={modal} closeHandler={closeModalHandler} />);
//   };

//   return (
//     <section id="research">
//       <div className={classes.wrapper}>
//         {activeModal}
//         <h2>Research</h2>
//         <div className={classes.moduleContainer}>
//           {query === "send-it" && (
//             <>
//               <VideoModule onClick={openModal.bind(this, "flow-tut")} title="">
//                 <span>Editing</span> with Flow
//               </VideoModule>
//               <Link href={`/explore/comparison-boost`}>
//                 <div title="Play Cpmparison Boost">
//                   <TutorialModule>
//                     Comparison <span>Boost</span>
//                   </TutorialModule>
//                 </div>
//               </Link>
//               <a
//                 href="/intro-to-flow.pdf"
//                 target="_blank"
//                 title="Introduction to Flow Blocks PDF"
//               >
//                 <TutorialModule>
//                   Introduction to <span>Flow</span> Blocks
//                 </TutorialModule>
//               </a>
//               <a
//                 href="/sensing-blocks.pdf"
//                 target="_blank"
//                 title="I Sense a Disturbance in the Blocks PDF"
//               >
//                 <HintModule>
//                   Tips &amp; Tricks: <span>Sensing</span> Blocks
//                 </HintModule>
//               </a>
//               <TutorialModule
//                 title="Watch the tutorial"
//                 onClick={openModal.bind(this, "how-to", sendItSubtitles)}
//               >
//                 How to <span>Send It</span>
//               </TutorialModule>
//               <Link href={`/${query}/play`}>
//                 <div title="Play Send It">
//                   <SneakPeekModule>
//                     Give it a <span>Go</span>
//                   </SneakPeekModule>
//                 </div>
//               </Link>
//             </>
//           )}
//           {query === "magnebot" && (
//             <>
//               <VideoModule onClick={openModal.bind(this, "flow-tut")} title="">
//                 <span>Editing</span> with Flow
//               </VideoModule>
//               <TutorialModule
//                 title="Watch the tutorial"
//                 onClick={openModal.bind(this, "how-to", magnebotSubtitles)}
//               >
//                 How to <span>MagneBot</span>
//               </TutorialModule>
//               <Link href={`/${query}/play`}>
//                 <div title="Play MagneBot">
//                   <SneakPeekModule>
//                     Give it a <span>Go</span>
//                   </SneakPeekModule>
//                 </div>
//               </Link>
//               <a
//                 href="https://www.recycleright.co.nz/"
//                 target="_blank"
//                 title="Play Recycle Right"
//               >
//                 <ResourceModule>
//                   <span>Recycle Right</span> Game
//                 </ResourceModule>
//               </a>
//             </>
//           )}
//         </div>
//         <p className={classes.description}>
//           {query === "send-it" &&
//             "Work through the four modules above to complete your research. Make sure that you understand all of the content as you will need it to create your solution!"}
//           {query === "magnebot" &&
//             "Work through the modules above to complete your individual research. Make sure that you understand all of the content as you will need it to create your own solution! if you get stuck, see if any of your classmates can lend a helping hand."}
//         </p>
//       </div>
//     </section>
//   );
// };

export default Research;
