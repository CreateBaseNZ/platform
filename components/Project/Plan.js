import Img from "../UI/Img";
import classes from "./Plan.module.scss";

const Plan = ({ data }) => {
  return (
    <div className={classes.view}>
      <div className={classes.container}>
        <div className={classes.imgWrapper}>
          <Img src="/plan.svg" layout="fill" objectFit="contain" />
        </div>
        <div className={classes.contentContainer}>
          <h2>Let's plan!</h2>
          {data.map((p, i) => (
            <p key={i} className={classes.content}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

// const Plan = ({ query }) => {
//   return (
//     <section id="plan">
//       <div className={classes.wrapper}>
//         <h2>Plan</h2>
//         {query === "send-it" && (
//           <p className={classes.description}>
//             Open up your learning journal and answer all of the questions in the
//             Plan section! If you get stuck, ask one of your classmates for help
//             but don't forget to explain your own reasoning!
//           </p>
//         )}
//         {query === "magnebot" && (
//           <>
//             <p className={classes.description}>
//               Think back to when you were manually controlling the arm... What path did you take to reach the recycling bins? How did you avoid breaking the arm?
//             </p>
//             <p className={classes.description}>
//               As a human, you had to decide which actions to perform in which order to move and control the magnetic sphere.
//               Writing a program is the exact same thing!
//               A program is simply a set of pre-written instructions that tell a robot or other device which action to perform in which order!
//             </p>
//             <p className={classes.description}>
//               In the Create step, you will write a program (a set of instructions) and upload it to MagneBot.
//               The robot will then follow your exact instructions to automatically complete the same task!
//               Unlike you, however, the robot is unable to make decisions on its own. You will need to tell it exactly what do, testing often to find and solve
//               any problems along the way.
//             </p>
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

export default Plan;
