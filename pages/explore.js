import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { ColourLogo } from "/components/UI/Icons";
import GreenButton from "/components/UI/GreenButton";

import classes from "/styles/Explore.module.scss";
import Thumbnail from "../components/Thumbnail";

const DUMMY_PROJECTS = [
  {
    name: "Send It",
    query: "send-it",
    thumbnail: "/send_it_thumbnail.png",
    img: "/send_it.png",
    caption:
      "In this project, users will automate a jumping game by creating a simple \"AI\" that is able to exceed human capabilities and achieve as high of a score as possible. This AI will be controlling a robot with the task of delivering a package as fast as possible, automatically jumping over any obstacles that get in its way.",
  },
  {
    name: "Coming soon",
    query: "",
    thumbnail: "/coming-soon.png",
    caption: "Coming soon.",
    comingSoon: true,
  },
  {
    name: "Coming soon",
    query: "",
    thumbnail: "/coming-soon.png",
    caption: "Coming soon.",
    comingSoon: true,
  },
];

const Explore = () => {
  const [activeProject, setActiveProject] = useState(0);

  const thumbnailHandler = (index, comingSoon) => {
    if (!comingSoon) {
      setActiveProject(index);
    }
  };

  return (
    <div className={classes.explore}>
      <Head>
        <title>Explore | CreateBase</title>
        <meta name="description" content="Explore CreateBase projects" />
      </Head>
      <div className={classes.logo}>
        <ColourLogo layout="fill" objectFit="contain" quality={100} />
      </div>
      <h1 className={classes.h1}>Select a project</h1>
      <div className={classes.selectedProject}>
        <div className={classes.content}>
          <h2>{DUMMY_PROJECTS[activeProject].name}</h2>
          <p>{DUMMY_PROJECTS[activeProject].caption}</p>
          <Link
            href={{
              pathname: "/overview/[project]",
              query: { project: DUMMY_PROJECTS[activeProject].query },
            }}
          >
            <div>
              <GreenButton caption="Continue" />
            </div>
          </Link>
        </div>
        <div className={classes.coverImage}>
          <Image
            src={DUMMY_PROJECTS[activeProject].img}
            layout="fill"
            objectFit="cover"
            alt={DUMMY_PROJECTS[activeProject].name}
          />
        </div>
      </div>
      <div className={classes.allProjects}>
        {DUMMY_PROJECTS.map((project, index) => (
          <Thumbnail
            key={index}
            activeProject={activeProject}
            index={index}
            src={project.thumbnail}
            name={project.name}
            comingSoon={project.comingSoon}
            thumbnailHandler={thumbnailHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default Explore;
