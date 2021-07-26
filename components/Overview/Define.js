import { useState } from "react";
import { InfoModule } from "../Modules";
import Modal from "../UI/Modal";
import CloseIcon from "@material-ui/icons/Close";
import classes from "/styles/Overview.module.scss";

const Delivery = (props) => {
  return (
    <div className={classes.definePrompt}>
      <button className={classes.sendItClose} onClick={props.closeHandler}>
        <CloseIcon />
      </button>
      <h4>Types of delivery robots</h4>
      <ol>
        <li>
          What examples of delivery robots/vehicles can you think of? Discuss
          with your group and see how many you can list down in your learning
          journal. To get you started, a few examples might be bicycles,
          quad-bikes and airplanes.
        </li>
        <li>
          Pick three of the robots/vehicles that you identified in task 1. For
          each of them, what types of goods does this device normally deliver?
          Can you think of any other goods that it could be used for (that it is
          currently not being used to deliver)? Discuss with your group and
          write your answers in your learning journals.
        </li>
        <li>
          Out of the same three devices, which does your team think would be
          best at delivering mail to people’s letterboxes in a suburban
          environment? Discuss with a team and make sure that you agree on an
          answer. Justify your answer by listing the pros and cons of each
          device in your learning journals.
        </li>
      </ol>
    </div>
  );
};

const Mail = (props) => {
  return (
    <div className={classes.definePrompt}>
      <button className={classes.sendItClose} onClick={props.closeHandler}>
        <CloseIcon />
      </button>
      <h4>Delivering mail</h4>
      <ol>
        <li>
          Discuss each of the following questions in your group, making sure
          that each of you write down your answers in your learning journals.
          <ol type="a">
            <li>
              What types of obstacles might a humanoid robot that delivers mail
              to people's letterboxes encounter?
            </li>
            <li>
              Pick three of these obstacles. For each of them, describe how the
              humanoid delivery robot could detect and avoid them. What sensors
              would it need? What actions would it need to be able to perform?
            </li>
            <li>
              What design features, like sensors, transportation mode and shape,
              would the humanoid delivery robot need if it was instead used to
              deliver mail to letterboxes 100 metres under water?
            </li>
          </ol>
        </li>
      </ol>
    </div>
  );
};

const Controlling = (props) => {
  return (
    <div className={classes.definePrompt}>
      <button className={classes.sendItClose} onClick={props.closeHandler}>
        <CloseIcon />
      </button>
      <h4>Controlling a robot</h4>
      <ol>
        <li>
          Broadly speaking, artificial intelligence (AI) is all about creating
          programs and machines that are able to carry out human behaviours like
          critical thinking and decision making. Generally, the realism of an AI
          is judged by how closely it acts like a human. AI can be as simple as
          an automatic light switch or as complicated as an autocorrect in a
          text document. As a group, see how many different pieces of technology
          you can think of that utilise AI. List them all in your learning
          journals.
        </li>
        <li>
          What do you think are the pros and cons of driving a delivery van
          using a person compared to an AI? Things that you could consider
          include costs of operating the van, the required size of the van,
          driving efficiency, emergency situations like accidents. Discuss as a
          group and list all of the pros and cons you can think of for humans
          and AI in your learning journals.
        </li>
      </ol>
    </div>
  );
};

const Ethics = (props) => {
  return (
    <div className={classes.definePrompt}>
      <button className={classes.sendItClose} onClick={props.closeHandler}>
        <CloseIcon />
      </button>
      <h4>The ethics of automation</h4>
      <ol>
        <li>
          If a human driving a delivery van crashes into a house, who is
          responsible for the damage? Discuss as a group until you agree on an
          answer and then write it into your learning journals. Make sure that
          you justify your answers.
        </li>
        <li>
          If a robot driving a delivery van crashes into a house, who is
          responsible for the damage? The robot (it only did what it was
          programmed to do)? The programmer? The company who sold the robot? Or
          someone/something else? Discuss as a group until you agree on an
          answer and then write it into your learning journals. Make sure that
          you justify your answers.
        </li>
        <li>
          If we replace a delivery driver with a robot, what happens to the
          driver? They will lose their job and their income. Is this trade worth
          it if it improves delivery times? Explain why or why not by first
          discussing as a group and then writing an answer in your learning
          journals.
        </li>
        <li>
          How could the government support this person who has lost their job
          because they were replaced by a robot? Discuss as a group and then
          write your recommendations into your learning journals.
        </li>
      </ol>
    </div>
  );
};

const Trolley = (props) => {
  return (
    <div className={classes.definePrompt}>
      <button className={classes.sendItClose} onClick={props.closeHandler}>
        <CloseIcon />
      </button>
      <h4>The trolley problem</h4>
      <ol>
        <li>
          A train is moving down the tracks and is going to run over five
          people! You have a lever that you could pull to send the train down
          another track, which would result in it only running over one person.
          Would you pull the lever? Discuss as a group and then write your
          answers in your learning journals. Make sure that you explain why you
          made your decision.
        </li>
        <li>
          Broadly speaking, artificial intelligence (AI) is all about creating
          programs and machines that are able to carry out human behaviours like
          critical thinking and decision making. Generally, the realism of an AI
          is about how closely it acts like a human. AI can be as simple as an
          automatic light switch or as complicated as a self-driving car. As AI
          becomes really common, there will eventually be a situation where an
          AI needs to decide between two or more groups of people to harm. How
          do you think AI should make decisions where every possible action
          would cause some harm to humans? What variables will they need to take
          into account? For example, should a self-driving car value the safety
          of the people in the car more or less than potential victims outside
          the car?
        </li>
      </ol>
    </div>
  );
};

const Define = (props) => {
  const [activePrompt, setActivePrompt] = useState();

  const closeHandler = () => {
    setActivePrompt(null);
  };
  const openPrompt = (prompt) => {
    let modal;
    switch (prompt) {
      case "delivery":
        modal = <Delivery closeHandler={closeHandler} />;
        break;
      case "mail":
        modal = <Mail closeHandler={closeHandler} />;
        break;
      case "controlling":
        modal = <Controlling closeHandler={closeHandler} />;
        break;
      case "ethics":
        modal = <Ethics closeHandler={closeHandler} />;
        break;
      case "trolley":
        modal = <Trolley closeHandler={closeHandler} />;
        break;
    }

    setActivePrompt(<Modal children={modal} closeHandler={closeHandler} />);
  };

  return (
    <section id="define">
      {activePrompt}
      <h2>Define</h2>
      <div className={classes.moduleContainer}>
        <InfoModule onClick={openPrompt.bind(this, "delivery")}>
          Types of <span>Delivery</span> Robots
        </InfoModule>
        <InfoModule onClick={openPrompt.bind(this, "mail")}>
          Delivering <span>Mail</span>
        </InfoModule>
        <InfoModule onClick={openPrompt.bind(this, "controlling")}>
          <span>Controlling</span> a Robot
        </InfoModule>
        <InfoModule onClick={openPrompt.bind(this, "ethics")}>
          The <span>Ethics</span> of Automation
        </InfoModule>
        <InfoModule onClick={openPrompt.bind(this, "trolley")}>
          The <span>Trolley Problem</span>
        </InfoModule>
      </div>
      <p className={classes.description}>
        Explore the advantages and disadvantages of automation and AI by
        discussing the questions in these cards with your peers. Make sure to
        write your groups answers in your individual learning journals!
      </p>
      <p className={classes.description}>
        When every group has finished, your teacher will call you back to
        discuss your answers and narrow in on the problem that you will be
        solving.
      </p>
    </section>
  );
};
//Narrow in on the problem and get to know your tools. Where to begin,
//where to begin ...

export default Define;
