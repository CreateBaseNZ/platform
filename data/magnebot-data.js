export const magnebotData = {
  name: "MagneBot",
  query: "magnebot",
  caption:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non aliquam augue. Nullam nunc purus, iaculis at congue a, varius vel massa. Suspendisse eget pharetra ipsum. Praesent vulputate ipsum laoreet tempor viverra. Curabitur vehicula bibendum facilisis. Duis tincidunt mauris ac sem imperdiet imperdiet.",
  stacked: true,
  scenePrefix: "Project_RoboticArm_1",
  runType: "once",
  defineCaption: [
    "As a class, dive into group discussions around the Project theme to fully define our problem.",
    "Don't have a teacher to guide you through? Check back soon for individual content!",
  ],
  situation: {
    url: "https://youtu.be/iiWiwxxkq2Q",
    src: "/magnebot/vid/situation.mp4",
    h1: "Introducing MagneBot, a robotic arm that can move objects with its magnetic sphere attachment! This arm is located in our autonomous recycling facility. Being autonomous means that the entire facility is run by robots: there are no humans present!",
    h2: "Unfortunately, a self-driving cart has driven through our recycling facility and split bags of rubbish all over the floor! If those bags contain magnetic materials, we might be able to clean up this mess without having to get our own hands dirty...",
    title: "Send It",
  },
  define: [
    {
      title: "TODO",
      img: "/send-it/img/types-0.png",
      url: "/send-it/pdf/types.pdf",
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
      type: "tut",
      title: "How to MagneBot",
      items: [
        {
          src: "/magnebot/vid/tut-1.mp4",
          subtitle: (
            <p>Use the controls to move the arm and pick up rubbish bags</p>
          ),
        },
        {
          src: "/magnebot/vid/tut-2.mp4",
          subtitle: <p>Get all three rubbish bags into the bins</p>,
        },
        {
          src: "/magnebot/vid/tut-3.mp4",
          subtitle: (
            <p>
              Hold down and drag with right click to orbit the camera around the
              arm
            </p>
          ),
        },
      ],
    },
  ],
  plan: [
    "Think back to when you were manually controlling the arm... What path did you take to reach the recycling bins? How did you avoid breaking the arm?",
    "As a human, you had to decide which actions to perform in which order to move and control the magnetic sphere. Writing a program is the exact same thing! A program is simply a set of pre-written instructions that tell a robot or other device which action to perform in which order!",
    "In the Create step, you will write a program (a set of instructions) and upload it to MagneBot. The robot will then follow your exact instructions to automatically complete the same task! Unlike you, however, the robot is unable to make decisions on its own. You will need to tell it exactly what do, testing often to find and solve any problems along the way.",
  ],
};
