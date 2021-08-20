import Link from "next/link";
import Img from "../UI/Img";
import classes from "./Create.module.scss";

const Create = ({ query, data }) => {
  return (
    <div className={classes.view}>
      <div className={classes.leftContainer}>
        {data && data.tasks && (
          <ul className={classes.tasks}>
            <h2>
              <span className="material-icons-outlined">inventory</span> Tasks
            </h2>
            {data.tasks.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        )}
        {data && data.hints && (
          <ul className={classes.hints}>
            <h2>
              <span className="material-icons-outlined">lightbulb</span> Hints
            </h2>
            {data.hints.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        )}
      </div>
      <div className={classes.rightContainer}>
        <div className={classes.imgContainer}>
          <Img
            src="/create.svg"
            layout="responsive"
            width={1000}
            height={1000}
            objectFit="cover"
          />
        </div>
        <div className={classes.caption}>{data.caption}</div>
        <Link href={`/${query}/code/create`}>
          <button className={classes.btn}>
            Start Creating!
            <span className="material-icons-outlined">arrow_right</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

// const Create = ({ query }) => {
//   return (
//     <section id="create">
//       <div className={classes.wrapper}>
//         <h2>Create</h2>
//         <p className={`${classes.description} ${classes.halfContainer}`}>
//           This step is all about building your own code, making sure you test as
//           you go. Rinse and repeat. Be sure to share it with your friends!
//         </p>
//         <div className={`${classes.taskContainer} ${classes.halfContainer}`}>
//           <h5>Task:</h5>
//           {query === "send-it" && (
//             <>
//               <ul>
//                 <li>
//                   Write some code so that your robot can detect incoming
//                   obstacles and avoid them.
//                 </li>
//                 <li>
//                   Reach 1000m to deliver your package and complete the task.
//                   Good luck!
//                 </li>
//               </ul>
//             </>
//           )}
//           {query === "magnebot" && (
//             <>
//               <ul>
//                 <li>
//                   Write some code so that MagneBot can clean up the recycling
//                   facility for you!
//                 </li>
//                 <li>
//                   Deposit three bags of rubbish into either of the two recycling
//                   bins to complete the task. Good luck!
//                 </li>
//               </ul>
//             </>
//           )}
//         </div>
//         <div className={`${classes.taskContainer} ${classes.halfContainer}`}>
//           <h5>Hint:</h5>
//           {query === "send-it" && (
//             <>
//               <ul>
//                 <li>
//                   Make sure that you hit the compile button to upload your code
//                   to the robot!
//                 </li>
//               </ul>
//             </>
//           )}
//           {query === "magnebot" && (
//             <>
//               <ul>
//                 <li>
//                   If you move the arm directly to the bin's coordinates you will
//                   hit the side! Instead, try moving the rubbish <b>above</b> the
//                   bin before dropping it inside.
//                 </li>
//                 <li>
//                   Make sure that you hit the compile button to upload your code
//                   to the robot!
//                 </li>
//               </ul>
//             </>
//           )}
//         </div>
//         <div className={classes.buttonContainer}>
//           <Link href={`/${query}/create`}>
//             <div>
//               <GreenButton caption="Go!" />
//             </div>
//           </Link>
//         </div>
//         <div className={classes.graphicContainer}>
//           <Image
//             src="/project-create.png"
//             alt="Create"
//             layout="fill"
//             objectFit="contain"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

export default Create;
