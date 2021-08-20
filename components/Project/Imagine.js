// import { ResourceModule } from "../Modules";
import Image from "next/image";

import VideoViewer from "../UI/VideoViewer";
import classes from "./Imagine.module.scss";

const Imagine = ({ data }) => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {data && <VideoViewer data={data} />}
        <div className={classes.instructions}>
          <div className={classes.imgContainer}>
            <Image
              src="/imagine.png"
              alt="Imagine"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className={classes.content}>
            <p>
              Open one of the learning journals and save it somewhere that you
              can access. Your teacher will tell you which file to open and
              where to save your copy.
            </p>
            <div className={classes.files}>
              <a
                href="https://docs.google.com/document/d/1BiybIT05ANt76b4rw0ArjHVHpN5LXWNxNCjavtnTM3A/edit?usp=sharing"
                target="_blank"
                title="Learning Journal - Google Docs"
                style={{ backgroundColor: "#3086F6" }}
              >
                <div className={classes.iconContainer}>
                  <span className="material-icons-outlined">link</span>
                </div>
                Google Docs
              </a>
              <a
                href="/Learning Journal.docx"
                title="Learning Journal - Word"
                download
                style={{ backgroundColor: "#144EB2" }}
              >
                <div className={classes.iconContainer}>
                  <span className="material-icons-outlined">file_download</span>
                </div>
                Word
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Imagine;
