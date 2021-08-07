import { useState } from "react";
import { InfoModule } from "../Modules";
import Modal from "../UI/Modal";
import {
  Delivery,
  Mail,
  Controlling,
  Ethics,
} from "../../projects/send-it/define";

import classes from "./project.module.scss";

const Define = ({ query }) => {
  const [activePrompt, setActivePrompt] = useState();

  const closeHandler = () => {
    setActivePrompt(null);
  };

  const openPrompt = (prompt) => {
    let modal;
    switch (prompt) {
      case "send-it__delivery":
        modal = <Delivery closeHandler={closeHandler} query={query} />;
        break;
      case "send-it__mail":
        modal = <Mail closeHandler={closeHandler} query={query} />;
        break;
      case "send-it__controlling":
        modal = <Controlling closeHandler={closeHandler} query={query} />;
        break;
      case "send-it__ethics":
        modal = <Ethics closeHandler={closeHandler} query={query} />;
        break;
    }
    setActivePrompt(<Modal children={modal} closeHandler={closeHandler} />);
  };

  return (
    <section id="define">
      {activePrompt}
      <div className={classes.wrapper}>
        <h2>Define</h2>
        <div className={classes.moduleContainer}>
          <InfoModule onClick={openPrompt.bind(this, "send-it__delivery")}>
            Types of <span>Delivery</span> Robots
          </InfoModule>
          <InfoModule onClick={openPrompt.bind(this, "send-it__mail")}>
            Delivering <span>Mail</span>
          </InfoModule>
          <InfoModule onClick={openPrompt.bind(this, "send-it__controlling")}>
            <span>Controlling</span> a Robot
          </InfoModule>
          <InfoModule onClick={openPrompt.bind(this, "send-it__ethics")}>
            The <span>Ethics</span> of Automation
          </InfoModule>
        </div>
        <p className={classes.description}>
          Explore the advantages and disadvantages of automation and AI by
          discussing the questions in ONE of these cards with your group. Make
          sure to write your answers in your own learning journal. If your group
          finishes early, feel free to try complete a second card as well!
        </p>
        <p className={classes.description}>
          When every group has finished, your teacher will call you back to
          discuss your answers and narrow in on the problem that you will be
          solving.
        </p>
      </div>
    </section>
  );
};

export default Define;
