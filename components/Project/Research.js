import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Modal from "../UI/Modal";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  TutorialModule,
  VideoModule,
  SneakPeekModule,
  HintModule,
  ResourceModule,
} from "../Modules";
import CloseIcon from "@material-ui/icons/Close";
import sendItSubtitles from "/public/send-it/tutorial/subtitles";
import magnebotSubtitles from "/public/magnebot/tutorial/subtitles";

import classes from "./project.module.scss";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
SwiperCore.use([Pagination]);

const renderBullet = (index, className) => {
  return `<span class="${className}"></span>`;
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

const HowTo = ({ closeHandler, query, subtitles }) => {
  return (
    <div className={classes.howTo}>
      <button className={classes.howToClose} onClick={closeHandler}>
        <CloseIcon />
      </button>
      <Swiper {...swiperOptions} className={classes.howToContainer}>
        {subtitles.map((caption, i) => renderSwiperSlide(caption, i, query))}
      </Swiper>
      <div className={classes.pagination}></div>
    </div>
  );
};

const FlowTutorial = ({ closeHandler }) => {
  return (
    <div className={classes.situation}>
      <button className={classes.situationClose} onClick={closeHandler}>
        <CloseIcon />
      </button>
      <video controls>
        <source src="/flow-tut.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

const Situation = ({ query, closeHandler }) => {
  return (
    <div className={classes.situation}>
      <button className={classes.situationClose} onClick={closeHandler}>
        <CloseIcon />
      </button>
      <video controls>
        <source src={`/${query}/vid/situation.mp4`} type="video/mp4" />
      </video>
    </div>
  );
};

const Research = ({ query }) => {
  const [activeModal, setActiveModal] = useState();

  const closeModalHandler = () => {
    setActiveModal(null);
  };

  const openModal = (id, subtitles) => {
    let modal;
    switch (id) {
      case "how-to":
        modal = (
          <HowTo
            query={query}
            subtitles={subtitles}
            closeHandler={closeModalHandler}
          />
        );
        break;
      case "situation":
        modal = <Situation closeHandler={closeModalHandler} />;
        break;
      case "flow-tut":
        modal = <FlowTutorial closeHandler={closeModalHandler} />;
        break;
      default:
        return;
    }
    setActiveModal(<Modal children={modal} closeHandler={closeModalHandler} />);
  };

  return (
    <section id="research">
      <div className={classes.wrapper}>
        {activeModal}
        <h2>Research</h2>
        <div className={classes.moduleContainer}>
          {query === "send-it" && (
            <>
              <VideoModule onClick={openModal.bind(this, "flow-tut")} title="">
                <span>Editing</span> with Flow
              </VideoModule>
              <a
                href="/intro-to-flow.pdf"
                target="_blank"
                title="Introduction to Flow Blocks PDF"
              >
                <TutorialModule>
                  Introduction to <span>Flow</span> Blocks
                </TutorialModule>
              </a>
              <a
                href="/sensing-blocks.pdf"
                target="_blank"
                title="I Sense a Disturbance in the Blocks PDF"
              >
                <HintModule>
                  Tips &amp; Tricks: <span>Sensing</span> Blocks
                </HintModule>
              </a>
              <TutorialModule
                title="Watch the tutorial"
                onClick={openModal.bind(this, "how-to", sendItSubtitles)}
              >
                How to <span>Send It</span>
              </TutorialModule>
              <Link href={`/${query}/play`}>
                <div title="Play Send It">
                  <SneakPeekModule>
                    Give it a <span>Go</span>
                  </SneakPeekModule>
                </div>
              </Link>
              <VideoModule
                onClick={openModal.bind(this, "situation")}
                title="Play the situation video"
              >
                Rewatch the <span>Situation</span> Video
              </VideoModule>
            </>
          )}
          {query === "magnebot" && (
            <>
              <VideoModule onClick={openModal.bind(this, "flow-tut")} title="">
                <span>Editing</span> with Flow
              </VideoModule>
              <TutorialModule
                title="Watch the tutorial"
                onClick={openModal.bind(this, "how-to", magnebotSubtitles)}
              >
                How to <span>MagneBot</span>
              </TutorialModule>
              <Link href={`/${query}/play`}>
                <div title="Play MagneBot">
                  <SneakPeekModule>
                    Give it a <span>Go</span>
                  </SneakPeekModule>
                </div>
              </Link>
              <a
                href="https://www.recycleright.co.nz/"
                target="_blank"
                title="Play Recycle Right"
              >
                <ResourceModule>
                  <span>Recycle Right</span> Game
                </ResourceModule>
              </a>
            </>
          )}
        </div>
        <p className={classes.description}>
          {query === "send-it" &&
            "Work through the four modules above to complete your research. Make sure that you understand all of the content as you will need it to create your solution!"}
          {query === "magnebot" &&
            "Work through the modules above to complete your individual research. Make sure that you understand all of the content as you will need it to create your own solution! if you get stuck, see if any of your classmates can lend a helping hand."}
        </p>
      </div>
    </section>
  );
};

export default Research;
