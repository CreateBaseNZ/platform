import React from "react"
import classes from "./Leaderboard.module.scss"

const Leaderboard = () => {
  return (
    <div className={classes.leaderboardContainer}>
        <div className={classes.titleContainer}>
            <div className={classes.titleIcon}>
                <span className="material-icons-outlined">emoji_events</span>
            </div>
            <div className={classes.title}>
                <h2>Leaderboard</h2>
            </div>
            <div className={classes.spacer}></div>
            <div className={classes.btnContainer}>
                <button className={`${classes.CTAbtn} ${classes.challengeBtn}`}><p>Challenge a friend</p></button>
            </div>
            <div className={classes.exitModal}>
                <button><span className="material-icons-outlined">close</span></button>
            </div>
        </div>
        <div className={classes.contentContainer}>
            <div className={classes.leaderboard}>
                <div className={classes.leaderboardItem}>
                    <div className={`${classes.leadboardPosition} ${classes.firstPlace}`}>
                        <h3>1</h3>
                        <span className="material-icons">emoji_events</span>
                    </div>
                    <div className={classes.leaderboardName}>
                        <h4>Jimothy Jims</h4>
                    </div>
                    <div className={classes.leaderboardScore}>
                        <h4>130131pts</h4>
                    </div>
                </div>
                <div className={classes.leaderboardItem}>
                    <div className={`${classes.leadboardPosition} ${classes.secondPlace}`}>
                        <h3>2</h3>
                        <span className="material-icons">emoji_events</span>
                    </div>
                    <div className={classes.leaderboardName}>
                        <h4>Jimothy Jims</h4>
                    </div>
                    <div className={classes.leaderboardScore}>
                        <h4>130131pts</h4>
                    </div>
                </div>
                <div className={classes.leaderboardItem}>
                    <div className={`${classes.leadboardPosition} ${classes.thirdPlace}`}>
                        <h3>3</h3>
                        <span className="material-icons">emoji_events</span>
                    </div>
                    <div className={classes.leaderboardName}>
                        <h4>Jimothy Jims</h4>
                    </div>
                    <div className={classes.leaderboardScore}>
                        <h4>130131pts</h4>
                    </div>
                </div>
                <div className={classes.leaderboardItem}>
                    <div className={classes.leadboardPosition}>
                        <h3>4</h3>
                        <span className="material-icons">emoji_events</span>
                    </div>
                    <div className={classes.leaderboardName}>
                        <h4>Jimothy Jims</h4>
                    </div>
                    <div className={classes.leaderboardScore}>
                        <h4>130131pts</h4>
                    </div>
                </div>
                <div className={classes.leaderboardItem}>
                    <div className={classes.leadboardPosition}>
                        <h3>5</h3>
                        <span className="material-icons">emoji_events</span>
                    </div>
                    <div className={classes.leaderboardName}>
                        <h4>Jimothy Jims</h4>
                    </div>
                    <div className={classes.leaderboardScore}>
                        <h4>130131pts</h4>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Leaderboard