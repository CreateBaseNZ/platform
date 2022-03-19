import React from "react"
import classes from "./Subscribe.module.scss"
import {FBIcon, TwitterIcon} from "../UI/Icons"

const Subscribe = () => {
  return (
    <div className={classes.shareContainer}>
        <div className={classes.titleContainer}>
            <div className={classes.title}>
                <h2>Subscribe to stay updated on new challenges</h2>
            </div>
            <div className={classes.spacer}></div>
            <div className={classes.exitModal}>
                <button><span className="material-icons-outlined">close</span></button>
            </div>
        </div>
        <div className={classes.contentContainer}>
            <div className={classes.subscribeContainer}>
                <div className={classes.subscribeBtnContainer}>
                    <input type="text" placeholder="Email" />
                    <button className={classes.submitBtn}>
                        <p>Subscribe</p>
                    </button>
                </div>
                <div className={classes.errorMsg}>Email requires @</div>
            </div>
        </div>
    </div>
  )
}

export default Subscribe