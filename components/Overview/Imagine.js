import { ResourceModule } from "../Modules";
import classes from "./overview.module.scss";

const Imagine = ({ query }) => {
  return (
    <section id="imagine">
      <div className={classes.wrapper}>
        <h2>Imagine</h2>
        <div className={classes.centerContainer}>
          <video controls className={classes.video}>
            <source src={`/${query}/vid/situation.mp4`} type="video/mp4" />
          </video>
        </div>
        <div className={classes.centerContainer}>
          {query === "send-it" && (
            <p className={`${classes.description} ${classes.halfContainer}`}>
              Dive into the situation by watching this short video! What do you
              think is happening here? Discuss with your peers!
            </p>
          )}
          {query === "her0" && (
            <p className={`${classes.description} ${classes.halfContainer}`}>
              Lorem ipsum
            </p>
          )}
        </div>
        {query === "send-it" && (
          <>
            <div className={classes.moduleContainer}>
              <a
                href="https://docs.google.com/document/d/1BiybIT05ANt76b4rw0ArjHVHpN5LXWNxNCjavtnTM3A/edit?usp=sharing"
                target="_blank"
                title="Learning Journal - Google Docs"
              >
                <ResourceModule>
                  <span>Learning Journal</span> - Docs
                </ResourceModule>
              </a>
              <a
                href="/Learning Journal.docx"
                title="Learning Journal - Word"
                download
              >
                <ResourceModule>
                  <span>Learning Journal</span> - Word
                </ResourceModule>
              </a>
            </div>
            <p className={classes.description}>
              One made in Google Docs and the other in Word, open one of these
              documents, create a copy and save it somewhere that you can
              access. Your teacher will tell you which file to open and where to
              save your copy.
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default Imagine;
