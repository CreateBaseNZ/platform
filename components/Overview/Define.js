import { useState } from "react";
import { InfoModule } from "../Modules";
import Modal from "../UI/Modal";
import CloseIcon from "@material-ui/icons/Close";
import classes from "/styles/Overview.module.scss";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const Delivery = (props) => {
  return (
    <div className={classes.definePrompt}>
      <button className={classes.sendItClose} onClick={props.closeHandler}>
        <CloseIcon />
      </button>
      <h4>Types of delivery robots</h4>
      <ol>
        <li>
        What examples of delivery vehicles can you think of? Discuss with your 
        group and see how many you can list down in your learning journal. To 
        get you started, check out a few examples in these images:
        </li>
        <li>
        Pick three of the vehicles that you identified in task 1. For each of 
        them, what goods does this vehicle normally deliver? Discuss with your 
        group and write your answers in your learning journals.
        </li>
        <li>
        For each of the same three vehicles, can you think of any goods that the 
        vehicle could but does not currently deliver? What adjustments (if any) 
        would you need to make to the vehicle to make this possible? Discuss with 
        your group and write your answers in your learning journals.
        </li>
        <li>
        Out of the same three vehicles, which does your team think would be best 
        at delivering mail to people’s letterboxes in a suburban environment? 
        Discuss with a team and make sure that you agree on an answer. Justify your 
        answer by listing the pros and cons of each vehicle in your learning journals.  
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
            A humanoid robot is a robot that looks and moves like a human. What 
            types of obstacles might a humanoid robot that delivers mail to 
            people’s letterboxes encounter? List as many as you can think of.
            </li>
            <li>
            Pick three of these obstacles. For each of them, describe how the 
            humanoid mail delivery robot could detect and avoid them. What 
            sensors would it need? What actions would it need to perform?
            </li>
            <li>
            Let's imagine that the humanoid delivery robot was now going to be 
            used to deliver mail to letterboxes 50 metres underwater. What 
            design features would you add to this robot to help it deliver mail 
            underwater that would not be needed on land? Examples of design 
            features include size, shape and sensors. For each design feature, 
            explain why it would be beneficial for underwater delivery.
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
      Broadly speaking, artificial intelligence (AI) is all about creating 
      programs and machines that are able to carry out human behaviours like 
      critical thinking and decision making. Generally, the realism of an AI 
      is judged by how closely it acts like a human. AI can be as simple as 
      an automatic light switch or as complicated as an autocorrect in a text 
      document. 
      <ol>
        <li>
        As a group, see how many different pieces of technology you can think 
        of that utilise AI. List them all in your learning journals.
        </li>
        <li>
        What do you think are the pros and cons of driving a delivery van using 
        a person compared to an AI?. Discuss as a group and list all of the pros 
        and cons you can think of in your learning journals. At a minimum, your 
        pros and cons should include:
        <ol>
          <li>Costs of operating the van</li>
          <li>Required size of the van</li>
          <li>Driving efficiency</li>
          <li>What might happen in emergency situations like accidents</li>
        </ol>
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
          How could the government or us as a society support this person who has lost their job
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
    props.setUnlocked((state) => ({ ...state, research: true }));
    localStorage.setItem("run-it-down__research-unlocked", true);
    setActivePrompt(<Modal children={modal} closeHandler={closeHandler} />);
  };

  return (
    <section id="define">
      {activePrompt}
      <div className={`${classes.wrapper} ${props.unlocked ? "" : classes.locked}`}>
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
          discussing the questions in ONE of these cards with your group. Make sure to
          write your answers in your own learning journal. If your group finishes early, 
          feel free to try complete a second card as well!
        </p>
        <p className={classes.description}>
          When every group has finished, your teacher will call you back to
          discuss your answers and narrow in on the problem that you will be
          solving.
        </p>
      </div>
      {!props.unlocked && (
        <LockOutlinedIcon
          className={classes.lockIcon}
          style={{ fontSize: 48 }}
        />
      )}
    </section>
  );
};
//Narrow in on the problem and get to know your tools. Where to begin,
//where to begin ...

export default Define;
