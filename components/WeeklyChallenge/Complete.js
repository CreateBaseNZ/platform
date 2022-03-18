import React from "react"
import classes from "./Complete.module.scss"


const Complete = () => {
  return (
    <div className={classes.completeContainer}>
        <div className={classes.titleContainer}>
            <div className={classes.titleIcon}>
                <span className="material-icons-outlined">task_alt</span>
            </div>
            <div className={classes.title}>
                <h2>Challenge Complete!</h2>
            </div>
            <div className={classes.spacer}></div>
            <div className={classes.exitModal}>
                <button><span className="material-icons-outlined">close</span></button>
            </div>
        </div>
        <div className={classes.contentContainer}>
            <div className={classes.complete}>
                <div className={classes.statsContainer}>
                    <div className={classes.score}>
                        <span className="material-icons">verified</span>
                        <h3>130103pts</h3>
                    </div>
                    <div className={classes.historicalStats}>
                        <div className={classes.bestScore}>
                            <h5>Best</h5>
                            <h4>292929pts</h4>
                        </div>
                        <div className={classes.timeCompleted}>
                            <h5>Completed in</h5>
                            <h4>1hr 29m 30s</h4>
                        </div>
                    </div>
                </div>
                <div className={classes.submitNameContainer}>
                    <h6>Submit your name to the leaderboard</h6>
                    <div className={classes.submitNameBtnContainer}>
                        <input type="text" placeholder="Name" />
                        <button className={classes.submitBtn}>
                            <p>Submit</p>
                        </button>
                    </div>
                </div>
                <div className={classes.btnContainer}>
                    <button className={`${classes.leaderboardBtn} ${classes.CTAbtn}`}>
                        <span className="material-icons-outlined">emoji_events</span>
                        <p>Leaderboard</p>
                    </button>
                    <button className={`${classes.restartBtn} ${classes.CTAbtn}`}>
                        <span className="material-icons-outlined">restart_alt</span>
                        <p>Restart</p>
                    </button>
                    <button className={`${classes.challengeBtn} ${classes.CTAbtn}`}>
                        <p>Challenge Friends</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Complete