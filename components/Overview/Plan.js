import { ResourceModule } from "../Modules";

import classes from "/styles/Overview.module.scss";

const Plan = (props) => {
  return (
    <section>
      <h2>Plan</h2>
      <p className={classes.description}>
        One made in Google Docs and the other in Word, open one of these documents, create a copy and save it somewhere that you can access.
        Your teacher will tell you which file to open and where to save your copy.
      </p>
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
        When you have your own file, go ahead and answer all of the questions in the Plan section!
      </p>
    </section>
  );
};

export default Plan;
