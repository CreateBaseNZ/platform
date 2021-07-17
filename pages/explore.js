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
    name: "Run It Down",
    routerQuery: "run-it-down",
    src: "/project.png",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non aliquam augue. Nullam nunc purus, iaculis at congue a, varius vel massa. Suspendisse eget pharetra ipsum. Praesent vulputate ipsum laoreet tempor viverra. Curabitur vehicula bibendum facilisis. Duis tincidunt mauris ac sem imperdiet imperdiet.",
  },
  {
    name: "Coming soon",
    routerQuery: "",
    src: "/coming-soon.png",
    caption: "Coming soon.",
    comingSoon: true,
  },
  {
    name: "Coming soon",
    routerQuery: "",
    src: "/coming-soon.png",
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
              query: { project: DUMMY_PROJECTS[activeProject].routerQuery },
            }}
          >
            <div>
              <GreenButton caption="Continue" />
            </div>
          </Link>
        </div>
        <div className={classes.coverImage}>
          <Image
            src={DUMMY_PROJECTS[activeProject].src}
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
            src={project.src}
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
