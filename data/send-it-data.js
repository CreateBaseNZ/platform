// import Image from "next/image";
// import CloseIcon from "@material-ui/icons/Close";
// import classes from "../../components/Project/project.module.scss";

export const sendItData = {
  name: "Send It",
  query: "send-it",
  caption:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non aliquam augue. Nullam nunc purus, iaculis at congue a, varius vel massa. Suspendisse eget pharetra ipsum. Praesent vulputate ipsum laoreet tempor viverra. Curabitur vehicula bibendum facilisis. Duis tincidunt mauris ac sem imperdiet imperdiet.",
  stacked: true,
  scenePrefix: "Project_Jump_0",
  runType: "loop",
  defineCaption: [
    "Explore the advantages and disadvantages of automation and AI by discussing the questions in ONE of these cards with your group. Make sure to write your answers in your own learning journal. If your group finishes early, feel free to try complete a second card as well!",
    "When every group has finished, your teacher will call you back to discuss your answers and narrow in on the problem that you will be solving.",
  ],
  situation: {
    url: "https://youtu.be/iiWiwxxkq2Q",
    src: "/send-it/vid/situation.mp4",
    h1: "Dive into the situation by watching this short video.",
    h2: "What do you think is happening here? Discuss with your peers!",
    title: "Send It",
  },
  define: [
    {
      title: "Types of delivery robots",
      img: "/send-it/img/types-0.png",
      url: "/send-it/pdf/types.pdf",
    },
    {
      title: "Delivering mail",
      img: "/send-it/img/mail-0.png",
      url: "/send-it/pdf/mail.pdf",
    },
    {
      title: "Controlling a robot",
      img: "/send-it/img/controlling-0.png",
      url: "/send-it/pdf/controlling.pdf",
    },
    {
      title: "The ethics of automation",
      img: "/send-it/img/ethics-0.png",
      url: "/send-it/pdf/ethics.pdf",
    },
  ],
  researchCaption: [
    "Work through the four modules above to complete your research.",
    "Make sure that you understand all of the content as you will need it to create your solution!",
  ],
  research: [
    {
      type: "video",
      title: "Flow tutorial",
      data: {
        url: "https://youtu.be/2Ndwtpk7iN8",
        src: "/flow-tut.mp4",
        h1: "Flow Tutorial",
        h2: "Get to know your way around Flow",
        title: "Flow Tutorial",
      },
    },
    {
      type: "pdf",
      title: "Introduction to Flow blocks",
      url: "/intro-to-flow.pdf",
    },
    {
      type: "pdf",
      title: "Tips & tricks: sensing blocks",
      url: "/sensing-blocks.pdf",
    },
    {
      type: "tut",
      title: "How to Send It",
      items: [
        {
          src: "/send-it/tutorial/vid-1.mp4",
          subtitle: <p>Run 1000m to deliver the Pizza</p>,
        },
        {
          src: "/send-it/tutorial/vid-2.mp4",
          subtitle: (
            <p>
              Jump over obstacles to avoid crashing into them
              <span class="material-icons-outlined">arrow_upward</span>
            </p>
          ),
        },
        {
          src: "/send-it/tutorial/vid-3.mp4",
          subtitle: (
            <p>
              Crouch under flying obstacles to avoid crashing into them
              <span class="material-icons-outlined">arrow_downward</span>
            </p>
          ),
        },
        {
          src: "/send-it/tutorial/vid-4.mp4",
          subtitle: (
            <p>
              Change the simulation speed to allow more time for your code to
              react
            </p>
          ),
        },
      ],
    },
  ],
};

// export const Delivery = ({ closeHandler }) => {
//   return (
//     <div className={classes.definePrompt}>
//       <button className={classes.howToClose} onClick={closeHandler}>
//         <CloseIcon />
//       </button>
//       <h4>Types of delivery robots</h4>
//       <ol>
//         <li>
//           What examples of delivery vehicles can you think of? Discuss with your
//           group and see how many you can list down in your learning journal. To
//           get you started, check out a few examples in these images:
//         </li>
//         <li>
//           Pick three of the vehicles that you identified in task 1. For each of
//           them, what goods does this vehicle normally deliver? Discuss with your
//           group and write your answers in your learning journals.
//         </li>
//         <li>
//           For each of the same three vehicles, can you think of any goods that
//           the vehicle could but does not currently deliver? What adjustments (if
//           any) would you need to make to the vehicle to make this possible?
//           Discuss with your group and write your answers in your learning
//           journals.
//         </li>
//         <li>
//           Out of the same three vehicles, which does your team think would be
//           best at delivering mail to people’s letterboxes in a suburban
//           environment? Discuss with a team and make sure that you agree on an
//           answer. Justify your answer by listing the pros and cons of each
//           vehicle in your learning journals.
//         </li>
//       </ol>
//       <div className={classes.imgContainer}>
//         <div className={classes.imgWrapper} title="NZ Post delivery by staff">
//           <Image
//             src="/send-it/img/delivery_vehicles_1.png"
//             alt="NZ Post delivery by staff"
//             layout="fill"
//             objectFit="cover"
//           />
//         </div>
//         <div
//           className={classes.imgWrapper}
//           title="DRU (by Nuro) delivering Domino's pizza"
//         >
//           <Image
//             src="/send-it/img/delivery_vehicles_2.png"
//             alt="DRU (by Nuro) delivering Domino's pizza"
//             layout="fill"
//             objectFit="cover"
//           />
//         </div>
//         <div
//           className={classes.imgWrapper}
//           title="A dense suburban neighbourhood"
//         >
//           <Image
//             src="/send-it/img/delivery_vehicles_3.png"
//             alt="A dense suburban neighbourhood"
//             layout="fill"
//             objectFit="cover"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export const Mail = ({ closeHandler }) => {
//   return (
//     <div className={classes.definePrompt}>
//       <button className={classes.howToClose} onClick={closeHandler}>
//         <CloseIcon />
//       </button>
//       <h4>Delivering mail</h4>
//       <ol>
//         <li>
//           Discuss each of the following questions in your group, making sure
//           that each of you write down your answers in your learning journals.
//           <ol type="a">
//             <li>
//               A humanoid robot is a robot that looks and moves like a human.
//               What types of obstacles might a humanoid robot that delivers mail
//               to people’s letterboxes encounter? List as many as you can think
//               of.
//             </li>
//             <li>
//               Pick three of these obstacles. For each of them, describe how the
//               humanoid mail delivery robot could detect and avoid them. What
//               sensors would it need? What actions would it need to perform?
//             </li>
//             <li>
//               Let's imagine that the humanoid delivery robot was now going to be
//               used to deliver mail to letterboxes 50 metres underwater. What
//               design features would you add to this robot to help it deliver
//               mail underwater that would not be needed on land? Examples of
//               design features include size, shape and sensors. For each design
//               feature, explain why it would be beneficial for underwater
//               delivery.
//             </li>
//           </ol>
//         </li>
//       </ol>
//       <div className={classes.imgContainer}>
//         <div
//           className={classes.imgWrapper}
//           title="Ford's package delivery robot"
//         >
//           <Image
//             src="/send-it/img/delivering_mail_1.png"
//             alt="Ford's package delivery robot"
//             layout="fill"
//             objectFit="cover"
//           />
//         </div>
//         <div
//           className={classes.imgWrapper}
//           title="World's deepest underwater post box"
//         >
//           <Image
//             src="/send-it/img/delivering_mail_2.png"
//             alt="World's deepest underwater post box"
//             layout="fill"
//             objectFit="cover"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export const Controlling = ({ closeHandler }) => {
//   return (
//     <div className={classes.definePrompt}>
//       <button className={classes.howToClose} onClick={closeHandler}>
//         <CloseIcon />
//       </button>
//       <h4>Controlling a robot</h4>
//       Broadly speaking, artificial intelligence (AI) is all about creating
//       programs and machines that are able to carry out human behaviours like
//       critical thinking and decision making. Generally, the realism of an AI is
//       judged by how closely it acts like a human. AI can be as simple as an
//       automatic light switch or as complicated as an autocorrect in a text
//       document.
//       <ol>
//         <li>
//           As a group, see how many different pieces of technology you can think
//           of that utilise AI. List them all in your learning journals.
//         </li>
//         <li>
//           What do you think are the pros and cons of driving a delivery van
//           using a person compared to an AI?. Discuss as a group and list all of
//           the pros and cons you can think of in your learning journals. At a
//           minimum, your pros and cons should include:
//           <ol>
//             <li>Costs of operating the van</li>
//             <li>Required size of the van</li>
//             <li>Driving efficiency</li>
//             <li>What might happen in emergency situations like accidents</li>
//           </ol>
//         </li>
//       </ol>
//       <div className={classes.imgContainer}>
//         <div
//           className={classes.imgWrapper}
//           title="Autonomous vehicle using image recognition to detect hazards"
//         >
//           <Image
//             src="/send-it/img/controlling_a_robot_1.png"
//             alt="Autonomous vehicle using image recognition to detect hazards"
//             layout="fill"
//             objectFit="cover"
//           />
//         </div>
//         <div
//           className={classes.imgWrapper}
//           title="RADAR system detects nearby objects"
//         >
//           <Image
//             src="/send-it/img/controlling_a_robot_2.png"
//             alt="RADAR system detects nearby objects"
//             layout="fill"
//             objectFit="cover"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export const Ethics = ({ closeHandler }) => {
//   return (
//     <div className={classes.definePrompt}>
//       <button className={classes.howToClose} onClick={closeHandler}>
//         <CloseIcon />
//       </button>
//       <h4>The ethics of automation</h4>
//       <ol>
//         <li>
//           If a human driving a delivery van crashes into a house, who is
//           responsible for the damage? Discuss as a group until you agree on an
//           answer and then write it into your learning journals. Make sure that
//           you justify your answers.
//         </li>
//         <li>
//           If a robot driving a delivery van crashes into a house, who is
//           responsible for the damage? The robot (it only did what it was
//           programmed to do)? The programmer? The company who sold the robot? Or
//           someone/something else? Discuss as a group until you agree on an
//           answer and then write it into your learning journals. Make sure that
//           you justify your answers.
//         </li>
//         <li>
//           If we replace a delivery driver with a robot, what happens to the
//           driver? They will lose their job and their income. Is this trade worth
//           it if it improves delivery times? Explain why or why not by first
//           discussing as a group and then writing an answer in your learning
//           journals.
//         </li>
//         <li>
//           How could the government or us as a society support this person who
//           has lost their job because they were replaced by a robot? Discuss as a
//           group and then write your recommendations into your learning journals.
//         </li>
//       </ol>
//       <div className={classes.imgContainer}>
//         <div
//           className={classes.imgWrapper}
//           title="Courier van brake-failure causes an incident"
//         >
//           <Image
//             src="/send-it/img/ethics_of_automation_1.png"
//             alt="Courier van brake-failure causes an incident"
//             layout="fill"
//             objectFit="cover"
//           />
//         </div>
//         <div
//           className={classes.imgWrapper}
//           title="Robotic systems automate delivery"
//         >
//           <Image
//             src="/send-it/img/ethics_of_automation_2.png"
//             alt="Robotic systems automate delivery"
//             layout="fill"
//             objectFit="cover"
//           />
//         </div>
//         <div
//           className={classes.imgWrapper}
//           title="A delivery man unloads packages from his truck"
//         >
//           <Image
//             src="/send-it/img/ethics_of_automation_3.png"
//             alt="A delivery man unloads packages from his truck"
//             layout="fill"
//             objectFit="cover"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
