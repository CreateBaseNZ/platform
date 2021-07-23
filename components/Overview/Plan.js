import { ResourceModule } from "../Modules";

import classes from "/styles/Overview.module.scss";

const Plan = (props) => {
  return (
    <section>
      <h2>Plan</h2>
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
        One made in Google Docs and the other in Word, either will do the trick
        so just choose one. Be sure to create a copy and make it all yours.
      </p>
    </section>
  );
};

export default Plan;
